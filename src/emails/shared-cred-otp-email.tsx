import {
    Body,
    Head,
    Heading,
    Html,
    Preview,
    Tailwind,
    Text,
    Container,
    Section,
    CodeInline,
    Img,
    Hr,
} from "@react-email/components"

type SharedCredOTPEmailProps = {
    sharedId: string
    OTP: string
}

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000"

export default function SharedCredOTPEmail({
    sharedId,
    OTP,
}: SharedCredOTPEmailProps) {
    return (
        <Html>
            <Tailwind>
                <Head />
                <Preview>Verification Code: {OTP} - SecureSave</Preview>
                <Body className="font-sans bg-gray-100">
                    <Container className="my-8">
                        <Section className="bg-white px-8 py-6 rounded-lg shadow-md">
                            <div className="flex items-center gap-4 mb-6">
                                <Img
                                    className="h-10"
                                    src={`${baseUrl}/static/icon.png`}
                                    alt="SecureSave Logo"
                                />
                                <Text className="text-3xl font-bold text-gray-800 m-0">
                                    SecureSave
                                </Text>
                            </div>
                            <Hr className="border-gray-200" />
                            <div className="my-8">
                                <Heading className="text-2xl font-bold text-gray-800">
                                    Verification Required
                                </Heading>
                                <Text className="text-gray-600 my-4">
                                    Thank you for using SecureSave. For your
                                    security, we need to verify it's really you.
                                    Please enter the following verification code
                                    when prompted for accessing the shared
                                    credential{" "}
                                    <CodeInline className="bg-gray-100 px-1 rounded">
                                        {sharedId}
                                    </CodeInline>
                                    .
                                </Text>
                            </div>
                            <Section className="bg-gray-50 py-6 px-4 rounded-md text-center my-6">
                                <Text className="text-gray-700 font-semibold !m-0">
                                    Your One-Time Password
                                </Text>
                                <Text className="text-4xl font-bold tracking-wider text-gray-800 my-2">
                                    {OTP}
                                </Text>
                                <Text className="text-sm text-gray-500 !m-0">
                                    This code will expire in 10 minutes
                                </Text>
                            </Section>
                            <Hr className="border-gray-200 my-6" />
                            <Text className="text-sm text-gray-600 bg-yellow-50 p-4 rounded border-l-4 border-yellow-400">
                                <strong>Security Notice:</strong> SecureSave
                                will never email you asking you to disclose or
                                verify your password, credit card, or banking
                                account information. If you did not request this
                                code, please ignore it.
                            </Text>
                        </Section>

                        {/* Enhanced Footer */}
                        <Section className="mt-6 px-6 py-4 text-center">
                            <Text className="text-gray-500 mb-2 text-sm">
                                This message was sent by SecureSave to help
                                protect your account security.
                            </Text>
                            <Text className="text-gray-500 text-xs mb-4">
                                © 2025 SecureSave by Technoflask. All rights
                                reserved.
                            </Text>
                            <Hr className="border-gray-200 my-2" />
                            <Text className="text-xs text-gray-400">
                                SecureSave, Inc. • 1234 Encryption Ave, Suite
                                500 • Cybercity, CS 90210
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}

SharedCredOTPEmail.PreviewProps = {
    sharedId: "c6a18d95-86b2-4b44-b95d-8d8c6e964068",
    OTP: "123556",
} satisfies SharedCredOTPEmailProps
