
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
