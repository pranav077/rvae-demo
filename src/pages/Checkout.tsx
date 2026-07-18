import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ShieldCheck, CreditCard, ArrowRight, ArrowLeft, CheckCircle, QrCode, Ticket, Sparkles, Info } from "lucide-react";
import { EVENTS, VENUES } from "@/data/mockData";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { showSuccess, showError } from "@/utils/toast";

const Checkout = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const event = EVENTS.find((e) => e.slug === slug);

  const [step, setStep] = useState(1);
  const [ticketQty, setTicketQty] = useState<Record<string, number>>({ ga: 1, vip: 0, backstage: 0 });
  const [attendeeName, setAttendeeName] = useState("");
  const [attendeeEmail, setAttendeeEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"blik" | "card" | "apple">("blik");
  const [blikCode, setBlikCode] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");

  if (!event) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col justify-between">
        <Navbar />
        <div className="text-center py-20 space-y-4">
          <h1 className="text-3xl font-black">Event Not Found</h1>
          <Link to="/events" className="text-purple-400 hover:underline">Back to Events</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const venue = VENUES.find((v) => v.id === event.venueId);

  const prices = {
    ga: event.price,
    vip: event.price * 2.5,
    backstage: event.price * 4
  };

  const totalAmount = 
    (ticketQty.ga * prices.ga) + 
    (ticketQty.vip * prices.vip) + 
    (ticketQty.backstage * prices.backstage);

  const handleNextStep = () => {
    if (step === 1 && totalAmount === 0) {
      showError("Please select at least one ticket.");
      return;
    }
    if (step === 2) {
      if (!attendeeName.trim() || !attendeeEmail.trim()) {
        showError("Please fill in all attendee details.");
        return;
      }
    }
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === "blik" && blikCode.length !== 6) {
      showError("Please enter a valid 6-digit BLIK code.");
      return;
    }
    if (paymentMethod === "card" && (!cardNumber || !cardExpiry || !cardCvc)) {
      showError("Please fill in all card details.");
      return;
    }

    showSuccess("Payment authorized successfully!");
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-between max-w-md mx-auto">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-xs transition-all ${
                step >= s ? "bg-purple-600 text-white shadow-[0_0_10px_rgba(168,85,247,0.5)]" : "bg-zinc-800 text-gray-500"
              }`}>
                {s === 4 && step === 4 ? <CheckCircle className="h-4 w-4" /> : s}
              </div>
              {s < 4 && (
                <div className={`h-0.5 w-12 sm:w-20 transition-all ${
                  step > s ? "bg-purple-600" : "bg-zinc-800"
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Ticket Selection */}
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-black uppercase tracking-wider text-white">Select Tickets</h2>
              
              {/* GA Ticket */}
              <div className="rounded-2xl border border-white/10 bg-zinc-900/30 p-5 flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-bold text-white">General Admission</h3>
                  <p className="text-xs text-gray-400">Standard entry to the main dancefloor and bars.</p>
                  <span className="text-sm font-black text-purple-400">PLN {prices.ga}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setTicketQty({ ...ticketQty, ga: Math.max(0, ticketQty.ga - 1) })}
                    className="h-8 w-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10"
                  >
                    -
                  </button>
                  <span className="font-bold text-white">{ticketQty.ga}</span>
                  <button
                    onClick={() => setTicketQty({ ...ticketQty, ga: ticketQty.ga + 1 })}
                    className="h-8 w-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* VIP Ticket */}
              <div className="rounded-2xl border border-white/10 bg-zinc-900/30 p-5 flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-bold text-white flex items-center">
                    VIP Pass <Sparkles className="ml-1.5 h-4 w-4 text-yellow-400" />
                  </h3>
                  <p className="text-xs text-gray-400">Fast-track entry, VIP balcony access, private bar & toilets.</p>
                  <span className="text-sm font-black text-cyan-400">PLN {prices.vip}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setTicketQty({ ...ticketQty, vip: Math.max(0, ticketQty.vip - 1) })}
                    className="h-8 w-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10"
                  >
                    -
                  </button>
                  <span className="font-bold text-white">{ticketQty.vip}</span>
                  <button
                    onClick={() => setTicketQty({ ...ticketQty, vip: ticketQty.vip + 1 })}
                    className="h-8 w-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Backstage Pass */}
              <div className="rounded-2xl border border-white/10 bg-zinc-900/30 p-5 flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="font-bold text-white flex items-center">
                    Backstage Experience <Sparkles className="ml-1.5 h-4 w-4 text-pink-500" />
                  </h3>
                  <p className="text-xs text-gray-400">Access to the backstage area, artist lounge, and premium drinks.</p>
                  <span className="text-sm font-black text-pink-400">PLN {prices.backstage}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setTicketQty({ ...ticketQty, backstage: Math.max(0, ticketQty.backstage - 1) })}
                    className="h-8 w-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10"
                  >
                    -
                  </button>
                  <span className="font-bold text-white">{ticketQty.backstage}</span>
                  <button
                    onClick={() => setTicketQty({ ...ticketQty, backstage: ticketQty.backstage + 1 })}
                    className="h-8 w-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="rounded-3xl border border-white/10 bg-zinc-900/50 p-6 space-y-6 h-fit">
              <h3 className="text-lg font-bold text-white">Order Summary</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>PLN {totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee</span>
                  <span className="text-green-400">FREE</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between font-bold text-white">
                  <span>Total</span>
                  <span className="text-purple-400">PLN {totalAmount}</span>
                </div>
              </div>
              <button
                onClick={handleNextStep}
                className="w-full rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 py-3 text-sm font-bold text-white hover:scale-105 transition-all"
              >
                Continue <ArrowRight className="inline ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Attendee Information */}
        {step === 2 && (
          <div className="max-w-xl mx-auto rounded-3xl border border-white/10 bg-zinc-900/30 p-8 space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-wider text-white">Attendee Details</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Full Name</label>
                <input
                  type="text"
                  placeholder="Kamil Nowak"
                  value={attendeeName}
                  onChange={(e) => setAttendeeName(e.target.value)}
                  required
                  className="w-full rounded-xl border border-white/10 bg-black py-2.5 px-4 text-sm text-white outline-none focus:border-purple-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Email Address</label>
                <input
                  type="email"
                  placeholder="kamil@ravenation.pl"
                  value={attendeeEmail}
                  onChange={(e) => setAttendeeEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-white/10 bg-black py-2.5 px-4 text-sm text-white outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                onClick={handlePrevStep}
                className="flex-1 rounded-full border border-white/10 bg-white/5 py-3 text-sm font-bold text-white hover:bg-white/10 transition-all"
              >
                <ArrowLeft className="inline mr-1 h-4 w-4" /> Back
              </button>
              <button
                onClick={handleNextStep}
                className="flex-1 rounded-full bg-purple-600 py-3 text-sm font-bold text-white hover:bg-purple-500 transition-all"
              >
                Continue <ArrowRight className="inline ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <div className="max-w-xl mx-auto rounded-3xl border border-white/10 bg-zinc-900/30 p-8 space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-wider text-white">Secure Payment</h2>
            
            {/* Payment Method Tabs */}
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setPaymentMethod("blik")}
                className={`rounded-xl border p-3 text-center font-bold text-xs transition-all ${
                  paymentMethod === "blik" ? "border-purple-500 bg-purple-500/10 text-purple-400" : "border-white/10 bg-black text-gray-400"
                }`}
              >
                BLIK
              </button>
              <button
                onClick={() => setPaymentMethod("card")}
                className={`rounded-xl border p-3 text-center font-bold text-xs transition-all ${
                  paymentMethod === "card" ? "border-purple-500 bg-purple-500/10 text-purple-400" : "border-white/10 bg-black text-gray-400"
                }`}
              >
                Card
              </button>
              <button
                onClick={() => setPaymentMethod("apple")}
                className={`rounded-xl border p-3 text-center font-bold text-xs transition-all ${
                  paymentMethod === "apple" ? "border-purple-500 bg-purple-500/10 text-purple-400" : "border-white/10 bg-black text-gray-400"
                }`}
              >
                Apple Pay
              </button>
            </div>

            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              {paymentMethod === "blik" && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-xs text-gray-400 bg-purple-500/5 border border-purple-500/10 p-3 rounded-xl">
                    <Info className="h-4 w-4 text-purple-400 flex-shrink-0" />
                    <span>Enter the 6-digit code from your banking app to authorize the transaction.</span>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">BLIK Code</label>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="123 456"
                      value={blikCode}
                      onChange={(e) => setBlikCode(e.target.value.replace(/\D/g, ""))}
                      required
                      className="w-full rounded-xl border border-white/10 bg-black py-3 px-4 text-center text-lg font-black tracking-widest text-white outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Card Number</label>
                    <input
                      type="text"
                      placeholder="4111 2222 3333 4444"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      required
                      className="w-full rounded-xl border border-white/10 bg-black py-2.5 px-4 text-sm text-white outline-none focus:border-purple-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        required
                        className="w-full rounded-xl border border-white/10 bg-black py-2.5 px-4 text-sm text-white outline-none focus:border-purple-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-400">CVC</label>
                      <input
                        type="text"
                        maxLength={3}
                        placeholder="123"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        required
                        className="w-full rounded-xl border border-white/10 bg-black py-2.5 px-4 text-sm text-white outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "apple" && (
                <div className="text-center py-6 space-y-3">
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-white text-black py-3 font-bold text-sm hover:bg-gray-200 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Pay with Apple Pay</span>
                  </button>
                </div>
              )}

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="flex-1 rounded-full border border-white/10 bg-white/5 py-3 text-sm font-bold text-white hover:bg-white/10 transition-all"
                >
                  <ArrowLeft className="inline mr-1 h-4 w-4" /> Back
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-purple-600 py-3 text-sm font-bold text-white hover:bg-purple-500 transition-all"
                >
                  Pay PLN {totalAmount}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 4: Order Confirmation & Digital Ticket */}
        {step === 4 && (
          <div className="max-w-xl mx-auto text-center space-y-8">
            <div className="space-y-3">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-green-400">
                <ShieldCheck className="h-10 w-10" />
              </div>
              <h2 className="text-3xl font-black uppercase tracking-wider text-white">Order Confirmed!</h2>
              <p className="text-sm text-gray-400">Your ticket has been generated and sent to <span className="text-white font-semibold">{attendeeEmail}</span>.</p>
            </div>

            {/* Digital Ticket Card */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 p-6 text-left space-y-6 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
              <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-purple-500/10 blur-2xl" />
              
              <div className="flex justify-between items-start border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Rave Nation Ticket</span>
                  <h3 className="text-lg font-bold text-white">{event.title}</h3>
                  <p className="text-xs text-gray-400">{venue?.name} • {event.city}</p>
                </div>
                <Ticket className="h-8 w-8 text-purple-400" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Attendee</span>
                  <p className="text-white font-semibold">{attendeeName}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Date & Time</span>
                  <p className="text-white font-semibold">{event.date}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Ticket Type</span>
                  <p className="text-white font-semibold">
                    {ticketQty.ga > 0 && "General Admission "}
                    {ticketQty.vip > 0 && "VIP Pass "}
                    {ticketQty.backstage > 0 && "Backstage Pass "}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Order ID</span>
                  <p className="text-white font-semibold">#RN-{Math.floor(100000 + Math.random() * 900000)}</p>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="border-t border-white/10 pt-6 flex flex-col items-center space-y-3 text-center">
                <QrCode className="h-32 w-32 text-white" />
                <span className="text-xs text-gray-400">Present this QR code at the door for entry</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="flex-1 rounded-full border border-white/10 bg-white/5 py-3 text-sm font-bold text-white hover:bg-white/10 transition-all"
              >
                Go to Dashboard
              </button>
              <Link
                to="/"
                className="flex-1 rounded-full bg-purple-600 py-3 text-sm font-bold text-white hover:bg-purple-500 transition-all flex items-center justify-center"
              >
                Return Home
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;