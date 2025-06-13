"use client"
import { useEffect, useState } from "react"
import { json } from "stream/consumers"
import { Button } from "@/components/ui/button"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { useRouter } from "next/navigation"

export default function Verify() {
    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")
    const [message, setMessage] = useState("")
    const [buttonDisplay, setButtonDisplay] = useState("Submit")
    const router = useRouter();

    useEffect(() => {
        const storedEmail = localStorage.getItem("verificationEmail");
        if (storedEmail) {
            setEmail(storedEmail)
        } else {
            window.location.href = "/signup";
        }
    }, [])

    async function handleVerify() {
        setButtonDisplay("Verifying...")
        setMessage("")
        const res = await fetch("/api/auth/verify/", {
            method: "POST",
            body: JSON.stringify({ email, code, }),
            headers: { "Content-type": "application/json" },
        });

        const data = await res.json();
        setMessage(data.message || data.error);

        if (res.ok) {
            setButtonDisplay("Redirecting...");
            localStorage.removeItem("verificationEmail"); // Optional cleanup
            router.push("/login"); // Redirect using Next.js router
            return;
        }

        setButtonDisplay("Submit")

    }
    console.log(code)
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <p className="absolute top-[1rem] left-[2rem] text-[2.5rem] font-inter text-main font-bold">Pro<span className="text-subMain">wood</span></p>
            <div className="w-full max-w-lg border-2 p-5 shadow-2xl">
                <div className="flex flex-col items-center">
                    <p className="text-[2rem] font-inter font-semibold">Two Step Verification</p>
                    <p className="text-slate-700 mb-[1.3rem]">Enter the verification code we sent to</p>
                    <p className="mb-[1.3rem] text-[1.1rem]">{email}</p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="mb-[5px] text-gray-600">type your 6 digit security code</p>
                    <div className="flex flex-col items-center gap-5">
                        <InputOTP className="mb-[1rem]" value={code} onChange={(code) => setCode(code)} maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>

                        <div className="flex flex-col gap-2">
                            <Button onClick={handleVerify}>{buttonDisplay}</Button>

                            {message && <p className="text-[1.05rem] text-red-900 text-sm">{message}</p>}
                        </div>


                    </div>
                    <p className="mx-[auto] block text-gray-600">Did not receive any verification email? <button className="text-blue-900">Resend</button>.</p>

                </div>
            </div>
        </div>
    )
}