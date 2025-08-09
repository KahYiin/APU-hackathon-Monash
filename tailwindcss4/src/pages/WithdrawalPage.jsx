import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftCircle, Leaf, DollarSign, Banknote, Building } from "lucide-react";
import { Link } from "react-router-dom";

export default function WithdrawPage() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [bankType, setBankType] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [message, setMessage] = useState("");

  const malaysiaBanks = [
    "Maybank",
    "CIMB Bank",
    "Public Bank",
    "RHB Bank",
    "Hong Leong Bank",
    "AmBank",
    "Bank Islam",
    "Bank Rakyat",
    "OCBC Bank",
    "HSBC Bank",
    "Standard Chartered Bank",
    "Alliance Bank",
    "Affin Bank",
    "UOB Malaysia",
    "Bank Muamalat",
    "Agrobank",
  ];

  const handleWithdraw = (e) => {
    e.preventDefault();

    if (!amount || !method) {
      setMessage("⚠️ Please fill in all fields.");
      return;
    }

    if (method === "bank" && (!bankType || !bankAccount)) {
      setMessage("⚠️ Please select your bank and enter your account number.");
      return;
    }

    // API call logic here
    setMessage("✅ Withdrawal request submitted!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f1ebd9] via-[#d8e0b8] to-[#bfc99b] p-6">
      <div className="w-full max-w-lg space-y-6 text-center">
        {/* Hero */}
        <div>
          <h1 className="text-4xl font-extrabold text-[#3f3318] flex items-center justify-center gap-3 drop-shadow-md">
            <Leaf className="text-[#889063]" size={38} /> Withdraw Funds
          </h1>
          <p className="text-[#3d4720] mt-3 text-lg">
            Turn your <span className="font-semibold">RecyCoins</span> into cash or eco-vouchers — rewards for your green actions 🌱
          </p>
        </div>

        {/* Card */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-3xl border border-[#e2dcc0] overflow-hidden">
          {/* Header */}
          <CardHeader className="flex items-center gap-3 bg-[#f7f4e8] border-b border-[#e2dcc0]">
            <Link to="/wallet" className="text-[#889063] hover:text-[#4C3D19] transition">
              <ArrowLeftCircle size={30} />
            </Link>
            <CardTitle className="text-2xl font-bold text-[#4C3D19]">
              Withdrawal Form
            </CardTitle>
          </CardHeader>

          {/* Content */}
          <CardContent className="p-6">
            <form onSubmit={handleWithdraw} className="space-y-6">
              {/* Amount */}
              <div>
                <label className="block mb-2 font-semibold text-[#4C3D19]">Amount</label>
                <div className="relative">
                  <DollarSign size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#889063]" />
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-3 pl-10 border border-[#d9d2b5] rounded-xl focus:ring-4 focus:ring-[#a6bb56] outline-none"
                    placeholder="Enter amount in RecyCoins"
                  />
                </div>
              </div>

              {/* Method */}
              <div>
                <label className="block mb-2 font-semibold text-[#4C3D19]">Withdrawal Method</label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full p-3 border border-[#d9d2b5] rounded-xl focus:ring-4 focus:ring-[#a6bb56] outline-none cursor-pointer"
                >
                  <option value="">Select method</option>
                  <option value="bank">🏦 Bank Transfer</option>
                  <option value="counter">🏢 Cash Out at Counter</option>
                </select>
              </div>

              {/* Bank Details - Only show if method is Bank */}
              {method === "bank" && (
                <>
                  {/* Bank Type */}
                  <div>
                    <label className="block mb-2 font-semibold text-[#4C3D19]">Bank Name</label>
                    <div className="relative">
                      <Building size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#889063]" />
                      <select
                        value={bankType}
                        onChange={(e) => setBankType(e.target.value)}
                        className="w-full p-3 pl-10 border border-[#d9d2b5] rounded-xl focus:ring-4 focus:ring-[#a6bb56] outline-none cursor-pointer"
                      >
                        <option value="">Select your bank</option>
                        {malaysiaBanks.map((bank, index) => (
                          <option key={index} value={bank}>
                            {bank}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Bank Account Number */}
                  <div>
                    <label className="block mb-2 font-semibold text-[#4C3D19]">Bank Account Number</label>
                    <div className="relative">
                      <Banknote size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#889063]" />
                      <input
                        type="text"
                        value={bankAccount}
                        onChange={(e) => setBankAccount(e.target.value)}
                        className="w-full p-3 pl-10 border border-[#d9d2b5] rounded-xl focus:ring-4 focus:ring-[#a6bb56] outline-none"
                        placeholder="Enter your bank account number"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#4C3D19] to-[#667a3a] hover:from-[#3d2f13] hover:to-[#55642b] text-[#f1ebd9] text-lg py-6 rounded-xl shadow-lg"
              >
                Submit Withdrawal
              </Button>

              {/* Message */}
              {message && (
                <div
                  className={`mt-4 p-4 rounded-xl text-center font-medium ${
                    message.startsWith("✅")
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {message}
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
