"use client";

import { Sprout, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-[#064e3b] text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="p-2 bg-white/10 rounded-lg">
                                <Sprout className="w-6 h-6 text-[#4ade80]" />
                            </div>
                            <span className="font-heading text-2xl font-bold">ZaraiRadar</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-md mb-6">
                            ZaraiRadar empowers farmers with data-driven insights. By combining hyper-local weather data with advanced crop models, we help you make smarter decisions.
                        </p>
                        <div className="flex gap-4">
                            <SocialIcon icon={<Facebook className="w-5 h-5" />} />
                            <SocialIcon icon={<Twitter className="w-5 h-5" />} />
                            <SocialIcon icon={<Linkedin className="w-5 h-5" />} />
                            <SocialIcon icon={<Instagram className="w-5 h-5" />} />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-heading font-semibold text-white mb-6">Platform</h4>
                        <ul className="space-y-4">
                            <FooterLink label="Risk Assessment" />
                            <FooterLink label="Weather Forecast" />
                            <FooterLink label="Crop Advisory" />
                            <FooterLink label="Consult an Expert" />
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-heading font-semibold text-white mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400 text-sm">
                                <MapPin className="w-5 h-5 text-[#4ade80] shrink-0" />
                                <span>Arfa Software Technology Park,<br />Lahore, Punjab</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Phone className="w-5 h-5 text-[#4ade80] shrink-0" />
                                <span>+92 300 1234567</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Mail className="w-5 h-5 text-[#4ade80] shrink-0" />
                                <span>support@zarairadar.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © 2026 ZaraiRadar. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
                        <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
    return (
        <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-[#4ade80] hover:text-[#0f172a] transition-all duration-300 text-gray-400">
            {icon}
        </a>
    )
}

function FooterLink({ label }: { label: string }) {
    return (
        <li>
            <a href="#" className="text-gray-400 hover:text-[#4ade80] transition-colors text-sm font-medium">
                {label}
            </a>
        </li>
    )
}
