import { Card } from "@/components/ui/card";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8F9FB] p-6 flex items-center justify-center">
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-5xl">
        <div className="bg-white rounded-[20px] p-8 space-y-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <div className="flex items-start gap-4">
            <div className="w-[52px] h-[52px] bg-black rounded-[14px] flex items-center justify-center text-white font-bold text-xl">
              JM
            </div>
            <div className="flex-1">
              <h1 className="font-semibold text-[20px] text-[#1A1D1F]">
                JM University
              </h1>
              <p className="text-[14px] leading-[1.5] text-[#6F767E] mt-2">
                E093, st2002, Teuk Thla, Phnom Penh Thmey, Sen Sok, Phnom Penh
              </p>
              <p className="text-[14px] text-[#6F767E] mt-1">Tel. 0715000004</p>
            </div>
            <div className="text-[#9A9FA5] text-[15px]">#C1028</div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-[13px] text-[#6F767E] mb-1">For</p>
              <p className="text-[15px] text-[#1A1D1F]">Thean</p>
            </div>
            <div>
              <p className="text-[13px] text-[#6F767E] mb-1">Tel.</p>
              <p className="text-[15px] text-[#1A1D1F]">012345678</p>
            </div>
            <div>
              <p className="text-[13px] text-[#6F767E] mb-1">Location</p>
              <p className="text-[15px] text-[#1A1D1F]">Sichuan</p>
            </div>
          </div>

          <div>
            <p className="text-[13px] text-[#6F767E] mb-4">Items</p>
            <div className="flex items-center gap-4 p-4 border border-[#E8ECEF] rounded-[14px]">
              <div className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center">
                <Image
                  src="/placeholder.svg"
                  alt="Computer Science"
                  width={32}
                  height={32}
                  className="text-blue-500"
                />
              </div>
              <div className="flex-1">
                <p className="text-[15px] text-[#1A1D1F] font-medium">
                  Computer Science Year 4
                </p>
                <p className="text-[13px] text-[#6F767E] mt-1">Qty: x1</p>
              </div>
              <p className="text-[15px] text-[#1A1D1F] font-medium">
                ៛1,000.00
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between text-[15px]">
              <span className="text-[#6F767E]">Subtotal</span>
              <span className="text-[#1A1D1F]">៛1,000.00</span>
            </div>
            <div className="flex justify-between text-[15px]">
              <span className="text-[#6F767E]">Discount (50%)</span>
              <span className="text-[#1A1D1F]">៛500.00</span>
            </div>
            <div className="flex justify-between text-[15px]">
              <span className="text-[#6F767E]">VAT (10%)</span>
              <span className="text-[#1A1D1F]">៛50.00</span>
            </div>
            <div className="flex justify-between text-[15px] font-medium pt-4 border-t border-[#E8ECEF]">
              <span className="text-[#1A1D1F]">Total</span>
              <span className="text-[#1A1D1F]">៛550.00</span>
            </div>
          </div>
        </div>

        <Card className="bg-white rounded-[20px] p-8 space-y-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-[34px] h-[34px]  rounded-[10px] flex items-center justify-center">
                <Image
                  src="/bakong-logo.png"
                  alt="University Logo"
                  width={80}
                  height={80}
                  className="text-white"
                />
              </div>
              <div className="text-[14px] text-[#6F767E]">Paying to</div>
            </div>
            <h2 className="text-[15px] text-[#1A1D1F] font-medium">
              JM University
            </h2>
            <div className="mt-6">
              <span className="text-[42px] font-semibold text-[#1A1D1F]">
                ៛550.00
              </span>
              <span className="text-[15px] text-[#6F767E] ml-2">KHR</span>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative bg-white rounded-[20px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
              <div className="absolute inset-0 rounded-[20px] border-[12px] border-white"></div>
              <div className="relative">
                <QRCodeSVG
                  value="https://example.com/payment"
                  size={220}
                  level="L"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center">
                    <Image src="/riel.png" alt="Riel" width={50} height={50} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-8">
              <span className="text-[14px] text-[#6F767E]">Payment via</span>
              <Image src="/khqr.png" alt="Riel" width={50} height={50} />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border border-[#E8ECEF] flex items-center justify-center text-[13px] text-[#6F767E]">
                  1
                </div>
                <p className="text-[14px] text-[#6F767E]">
                  Open your banking app
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border border-[#E8ECEF] flex items-center justify-center text-[13px] text-[#6F767E]">
                  2
                </div>
                <p className="text-[14px] text-[#6F767E]">
                  Scan the QR code with your banking app
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border border-[#E8ECEF] flex items-center justify-center text-[13px] text-[#6F767E]">
                  3
                </div>
                <p className="text-[14px] text-[#6F767E]">
                  Confirm the payment and Tada! 🎉
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
