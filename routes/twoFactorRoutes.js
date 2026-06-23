const express = require("express");
const router = express.Router();

const speakeasy = require("speakeasy");
const QRCode = require("qrcode");

const User = require("../models/User");


// =====================================
// Generate 2FA QR Code
// get /api/2fa/setup/:userId
// =====================================

router.get("/setup/:userId", async (req, res) => {

    try {

        const user = await User.findById(req.params.userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }


        const secret = speakeasy.generateSecret({
            name: `CRUD App (${user.email})`
        });


        await User.findByIdAndUpdate(
            req.params.userId,
            {
                twoFactorSecret: secret.base32,
                twoFactorEnabled: false
            }
        );


        const qrCode = await QRCode.toDataURL(
            secret.otpauth_url
        );


        res.json({

            message: "Scan QR code with Google Authenticator",

            qrCode: qrCode

        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});




// =====================================
// Verify OTP and Enable 2FA
// get /api/2fa/verify/:userId
// =====================================

router.post("/verify/:userId", async (req, res) => {

    try {

        const { token } = req.body;


        const user = await User
            .findById(req.params.userId)
            .select("+twoFactorSecret");


        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }


        const verified = speakeasy.totp.verify({

            secret: user.twoFactorSecret,

            encoding: "base32",

            token: token,

            window: 1

        });



        if (verified) {


            user.twoFactorEnabled = true;

            await user.save();


            return res.json({

                success: true,

                message: "2FA enabled successfully",

                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    provider: user.provider,
                    profileImage: user.profileImage || null,
                    twoFactorEnabled: true
                }

            });


        }



        res.json({

            success: false,

            message: "Invalid OTP"

        });



    } catch (error) {


        res.status(500).json({

            message: error.message

        });


    }

});




// =====================================
// Disable 2FA
// get /api/2fa/disable/:userId
// =====================================

router.get("/disable/:userId", async (req, res) => {

    try {


        await User.findByIdAndUpdate(

            req.params.userId,

            {

                twoFactorEnabled: false,

                twoFactorSecret: null

            }

        );


        res.json({

            message: "2FA disabled"

        });


    } catch(error) {


        res.status(500).json({

            message:error.message

        });


    }

});




// =====================================
// TEST: Generate valid OTP (for testing only)
// get /api/2fa/test-otp/:userId
// =====================================

router.get("/test-otp/:userId", async (req, res) => {
    try {
        const user = await User
            .findById(req.params.userId)
            .select("+twoFactorSecret");

        if (!user || !user.twoFactorSecret) {
            return res.status(400).json({
                message: "User or 2FA secret not found"
            });
        }

        const token = speakeasy.totp({
            secret: user.twoFactorSecret,
            encoding: "base32"
        });

        res.json({
            success: true,
            token: token,
            message: "Test OTP generated (testing only)"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
module.exports = router;
