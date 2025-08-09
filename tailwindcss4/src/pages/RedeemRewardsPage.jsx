import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, ArrowLeftCircle, Coins } from "lucide-react";
import { Link } from "react-router-dom";

export default function RedeemRewardsPage() {
  const [userCoins, setUserCoins] = useState(1500);

  const awards = [
    {
      id: 1,
      title: "Eco Store Voucher",
      description: "RM20 voucher for sustainable and eco-friendly products.",
      cost: 500,
      image:
        "https://images.unsplash.com/photo-1590080876121-7db4e964f9e1?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "Reusable Bottle",
      description: "Elegant stainless steel bottle — keep drinks cold or hot for hours.",
      cost: 800,
      image:
        "https://images.unsplash.com/photo-1600172454135-4a6e1bb3da89?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Tree Planting Donation",
      description: "Sponsor 5 trees and make a lasting impact on our planet.",
      cost: 300,
      image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const handleRedeem = (cost, title) => {
    if (userCoins < cost) {
      alert("⚠️ Not enough RecyCoins to redeem this reward.");
      return;
    }
    setUserCoins(userCoins - cost);
    alert(`🎉 You have successfully redeemed: ${title}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f1ebd9] via-[#e5e9c5] to-[#d8e0b8] flex flex-col items-center justify-center p-8">
      
      {/* Header */}
      <div className="text-center mb-10 max-w-3xl flex flex-col items-center justify-center">
        <h1 className="text-4xl font-extrabold text-[#4C3D19] drop-shadow-md animate-pulse flex items-center justify-center gap-3">
          <Gift className="text-[#889063]" size={38} /> Reward Redemption
        </h1>
        <p className="text-[#3d4720] mt-3 text-lg italic">
          Transform your RecyCoins into meaningful eco-friendly gifts 🌱 Every coin counts!
        </p>

        {/* Balance Section */}
        <div className="mt-5 bg-gradient-to-r from-[#4C3D19] to-[#354024] hover:from-[#354024] hover:to-[#2a2f1a] text-[#E5D7C4] px-8 py-4 rounded-full shadow-lg border border-yellow-400 inline-flex items-center gap-3 font-bold text-lg">
          <Coins className="text-yellow-400 animate-bounce" size={24} />
          Current Balance: <span className="text-yellow-200">{userCoins}</span> RecyCoins
        </div>

        {/* Back Button */}
        <div className="mt-5">
          <Link
            to="/wallet"
            className="inline-flex items-center gap-2 text-[#889063] hover:text-[#4C3D19] font-medium"
          >
            <ArrowLeftCircle size={24} /> Back to Wallet
          </Link>
        </div>
      </div>

      {/* Awards Grid */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center w-full max-w-6xl">
        {awards.map((award) => (
          <Card
            key={award.id}
            className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden border border-[#e6dec7] transform hover:scale-105 transition-all duration-300 hover:shadow-yellow-200"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={award.image}
                alt={award.title}
                className="h-48 w-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-white/80 px-3 py-1 rounded-full text-sm font-semibold text-[#4C3D19] shadow-md">
                {award.cost} <Coins className="inline text-yellow-500" size={14} />
              </div>
            </div>

            {/* Content */}
            <CardHeader className="pb-1">
              <CardTitle className="text-xl font-bold text-[#4C3D19] drop-shadow-sm text-center">
                {award.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow items-center text-center">
              <p className="text-[#3d4720] text-sm flex-grow">{award.description}</p>
              <div className="mt-5">
                <Button
                  className="bg-gradient-to-r from-[#354024] to-[#788639] hover:from-[#354024] hover:to-[#2a2f1a] text-[#E5D7C4] rounded-full px-5 shadow-md"
                  onClick={() => handleRedeem(award.cost, award.title)}
                >
                  Redeem Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
