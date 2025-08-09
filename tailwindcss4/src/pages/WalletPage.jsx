import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  ShoppingBag,
  Recycle,
  ArrowRightCircle,
  Eye,
  EyeOff
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function WalletPage() {
  const [showBalance, setShowBalance] = useState(false);

  const balance = 1234.56; // example data
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E5D7C4] to-[#CFBB99] p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Wallet Balance */}
          <Card className="bg-gradient-to-r from-[#354024] to-[#889063] shadow-lg rounded-2xl text-[#E5D7C4]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                <Wallet /> My Eco Wallet
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                <p className="text-lg">Current Balance</p>
                <div>
                  <span className="text-4xl font-extrabold text-[#E5D7C4]">
                    {showBalance ? `${balance} RecyCoins` : "****** RecyCoins"}
                  </span>

                  <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="p-2 rounded-full bg-transparent border-none focus:outline-none"
                  >
                    {showBalance ? (
                      <EyeOff size={20} className="text-[#E5D7C4]]" />
                    ) : (
                      <Eye size={20} className="text-[#E5D7C4]" />
                    )}
                  </button>
                </div>

                <p className="text-sm opacity-80">
                  Earn points by recycling & buying second-hand
                </p>
                <div className="pt-4">
                  <Button
                    variant="secondary"
                    className="bg-[#4C3D19] hover:bg-[#354024] text-[#E5D7C4]"
                  >
                    Redeem Rewards <ArrowRightCircle className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        {/* Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <Link to="/recycle">
            <Card className="hover:scale-105 transition-transform bg-[#E5D7C4] shadow-md">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="flex flex-row justify-center">
                  <Recycle className="text-[#889063] w-10 h-10" />
                  <div className="flex flex-col justify-center ml-4">
                    <p className="font-semibold text-left text-lg text-[#4C3D19]">
                      Recycle Items
                    </p>
                    <p className="text-sm text-[#354024]">
                      Earn RecyCoins for each item you recycle
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link to="/marketplace">
            <Card className="hover:scale-105 transition-transform bg-[#E5D7C4] shadow-md cursor-pointer">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="flex flex-row items-center w-full">
                  <ShoppingBag className="text-[#889063] w-10 h-10" />

                  <div className="flex flex-col justify-center ml-4">
                    <p className="font-semibold text-left text-lg text-[#4C3D19]">
                      Shop Second-Hand
                    </p>
                    <p className="text-sm text-[#354024]">
                      Use your RecyCoins to buy sustainable items
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
        {/* Transaction History */}
        <Card className="bg-[#f7f2e9] shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="text-[#4C3D19] text-xl font-bold">
              Transaction History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { item: "Old Chair", type: "Recycled", points: "+150" },
                { item: "Vintage Jacket", type: "Bought", points: "-300" },
                { item: "Glass Bottles", type: "Recycled", points: "+50" }
              ].map((t, idx) => (
                <div
                  key={idx}
                  className={`flex justify-between items-center p-3 transition-all duration-200 rounded-xl shadow-sm 
    ${t.type === "Bought" ? "bg-[#d0b3b3]" : "bg-[#bec4a3]"}`}
                >
                  {/* Left side with icon + text */}
                  <div className="flex items-center gap-3">
                    {t.type === "Recycled" ? (
                      <span className="bg-[#f7f2e9] p-2 rounded-lg">♻️</span>
                    ) : (
                      <span className="bg-[#f7f2e9] p-2 rounded-lg">🛍</span>
                    )}
                    <div className="flex flex-col text-left">
                      <p className="font-semibold text-[#4C3D19]">{t.item}</p>
                      <p className="text-sm text-[#354024]">{t.type}</p>
                    </div>
                  </div>

                  {/* Right side with points */}
                  <span
                    className={`font-bold px-3 py-1 rounded-full ${
                      t.points.startsWith("+")
                        ? "bg-[#889063] text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {t.points}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
