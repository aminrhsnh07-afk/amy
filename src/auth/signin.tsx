"use client";

import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

// --- Types ---
interface FormState {
    username: string;
    password: string;
    isLoading: boolean;
    error: string | null;
    success: boolean;
}

type SocialIcon = "facebook" | "instagram" | "pinterest";

// --- Geometric Shape Component ---
const GeometricShape = ({
    className,
    delay = 0,
}: {
    className: string;
    delay?: number;
}) => (
    <motion.div
        className={className}
        initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
    />
);

// --- Social Icon SVG ---


// --- Logo ---
const Logo = () => (
    <motion.div
        className="flex gap-1 items-end"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
        <div className="w-4 h-5 bg-white rounded-sm" />
        <div className="w-4 h-3.5 bg-white rounded-sm" />
    </motion.div>
);

// --- Input Field ---
const InputField = ({
    label,
    type,
    value,
    placeholder,
    onChange,
    delay,
}: {
    label: string;
    type: string;
    value: string;
    placeholder: string;
    onChange: (v: string) => void;
    delay: number;
}) => {
    const [focused, setFocused] = useState(false);

    return (
        <motion.div
            className="flex flex-col gap-1.5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
        >
            <label
                className="text-sm font-bold text-white"
                style={{ fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif" }}
            >
                {label}
            </label>
            <div className="relative">
                <input
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="w-full px-4 py-2.5 rounded-full text-sm text-white placeholder-white/40 outline-none transition-all duration-300"
                    style={{
                        fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                        background: "rgba(255,255,255,0.08)",
                        border: focused
                            ? "1.5px solid rgba(255,100,80,0.8)"
                            : "1.5px solid rgba(255,255,255,0.08)",
                        boxShadow: focused ? "0 0 0 3px rgba(255,100,80,0.15)" : "none",
                    }}
                />
            </div>
        </motion.div>
    );
};

// --- Main Login Page ---
export default function LoginPage() {
    const [form, setForm] = useState<FormState>({
        username: "TechTree",
        password: "••••••••••",
        isLoading: false,
        error: null,
        success: false,
    });

    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useTransform(mouseY, [-300, 300], [4, -4]);
    const rotateY = useTransform(mouseX, [-400, 400], [-4, 4]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
    };

    const handleSubmit = async () => {
        setForm((f) => ({ ...f, isLoading: true, error: null }));
        await new Promise((r) => setTimeout(r, 1400));
        if (!form.username || form.password.length < 3) {
            setForm((f) => ({ ...f, isLoading: false, error: "Invalid credentials." }));
        } else {
            setForm((f) => ({ ...f, isLoading: false, success: true }));
        }
    };

    return (
        <div
            className="min-h-screen w-full flex items-center justify-center overflow-hidden relative"
            style={{
                background: "linear-gradient(135deg, #3d0066 0%, #5c0080 40%, #2a004d 100%)",
                fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
            }}
            onMouseMove={handleMouseMove}
            ref={containerRef}
        >
            {/* Background geometric shapes */}
            <GeometricShape
                delay={0.1}
                className="absolute top-[8%] left-[30%] w-28 h-28 rounded-[30%] border-2 border-purple-400/20 rotate-12 pointer-events-none"
            />
            <GeometricShape
                delay={0.2}
                className="absolute bottom-[15%] left-[20%] w-40 h-40 rounded-[40%] border border-pink-400/15 -rotate-6 pointer-events-none"
            />
            <GeometricShape
                delay={0.15}
                className="absolute top-[20%] right-[8%] w-32 h-32 rounded-[35%] bg-blue-500/10 rotate-45 pointer-events-none"
            />
            <GeometricShape
                delay={0.25}
                className="absolute bottom-[10%] right-[15%] w-24 h-24 rounded-full bg-purple-400/10 pointer-events-none"
            />
            <GeometricShape
                delay={0.05}
                className="absolute top-[35%] left-[8%] w-20 h-20 rounded-[25%] border border-pink-500/20 rotate-[30deg] pointer-events-none"
            />
            <GeometricShape
                delay={0.3}
                className="absolute top-[60%] right-[30%] w-16 h-16 rounded-full border border-blue-400/20 pointer-events-none"
            />

            {/* Logo */}
            <div className="absolute top-6 left-7">
                <Logo />
            </div>

            {/* Main Card */}
            <div className="relative w-full max-w-4xl mx-4 grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[420px]">
                {/* Left: Welcome */}
                <motion.div
                    className="flex flex-col justify-center px-10 py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h1
                        className="text-6xl font-black text-white leading-tight mb-4"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        style={{ fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif" }}
                    >
                        Welcome!
                    </motion.h1>

                    <motion.div
                        className="w-10 h-0.5 bg-white/60 mb-5"
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.6, delay: 0.45 }}
                    />

                    <motion.p
                        className="text-white/55 text-sm leading-relaxed max-w-xs mb-8"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </motion.p>

                    <motion.button
                        className="self-start px-5 py-2 rounded-full text-white text-sm font-semibold cursor-pointer"
                        style={{
                            background: "linear-gradient(90deg, #ff6b4a 0%, #e63e3e 100%)",
                        }}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.65 }}
                        whileHover={{ scale: 1.05, boxShadow: "0 6px 20px rgba(230,62,62,0.4)" }}
                        whileTap={{ scale: 0.97 }}
                    >
                        Learn More
                    </motion.button>
                </motion.div>

                {/* Right: Sign In Card */}
                <motion.div
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                    }}
                >
                    <motion.div
                        className="rounded-2xl px-10 py-10 flex flex-col gap-5 h-full"
                        style={{
                            background: "rgba(80, 20, 90, 0.72)",
                            backdropFilter: "blur(18px)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
                        }}
                        initial={{ opacity: 0, y: 40, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Title */}
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.35 }}
                        >
                            <h2
                                className="text-2xl font-bold text-white mb-1"
                                style={{ fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif" }}
                            >
                                Sign in
                            </h2>
                            <div className="w-8 h-0.5 bg-pink-500/60 mx-auto rounded-full" />
                        </motion.div>

                        {/* Inputs */}
                        <InputField
                            label="User Name"
                            type="text"
                            value={form.username}
                            placeholder="Enter username"
                            onChange={(v) => setForm((f) => ({ ...f, username: v }))}
                            delay={0.4}
                        />
                        <InputField
                            label="Password"
                            type="password"
                            value={form.password}
                            placeholder="Enter password"
                            onChange={(v) => setForm((f) => ({ ...f, password: v }))}
                            delay={0.5}
                        />

                        {/* Error */}
                        <AnimatePresence>
                            {form.error && (
                                <motion.p
                                    className="text-red-400 text-xs text-center -mt-2"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    {form.error}
                                </motion.p>
                            )}
                            {form.success && (
                                <motion.p
                                    className="text-green-400 text-xs text-center -mt-2"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    ✓ Signed in successfully!
                                </motion.p>
                            )}
                        </AnimatePresence>

                        {/* Submit */}
                        <motion.button
                            onClick={handleSubmit}
                            disabled={form.isLoading}
                            className="w-full py-3 rounded-full font-bold text-white text-sm cursor-pointer disabled:opacity-70 relative overflow-hidden"
                            style={{
                                background: "linear-gradient(90deg, #ff9a4a 0%, #e63e3e 100%)",
                                boxShadow: "0 4px 20px rgba(230,80,62,0.35)",
                                fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                            }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            whileHover={{ scale: 1.02, boxShadow: "0 8px 28px rgba(230,62,62,0.5)" }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <AnimatePresence mode="wait">
                                {form.isLoading ? (
                                    <motion.span
                                        key="loading"
                                        className="flex items-center justify-center gap-2"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <motion.span
                                            className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full"
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                                        />
                                        Signing in…
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="label"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        Submit
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>

                        {/* Social Icons */}
                        <motion.div
                            className="flex items-center justify-center gap-5 pt-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.75 }}
                        >
                            {(["facebook", "instagram", "pinterest"] as SocialIcon[]).map((icon, i) => (
                                <motion.button
                                    key={icon}
                                    className="text-white/70 hover:text-white transition-colors cursor-pointer"
                                    whileHover={{ scale: 1.2, y: -2 }}
                                    whileTap={{ scale: 0.9 }}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.75 + i * 0.08 }}
                                >

                                </motion.button>
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}