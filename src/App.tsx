/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Clock, Calendar, Globe } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getTimezone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-white/20 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 w-full max-w-2xl"
      >
        <div className="space-y-12 text-center">
          {/* Header Label */}
          <div className="flex items-center justify-center gap-2 text-white/40 uppercase tracking-[0.3em] text-[10px] font-semibold">
            <Clock size={12} className="opacity-50" />
            <span>Tempo Real</span>
          </div>

          {/* Main Clock */}
          <div className="relative inline-block">
            <motion.h1 
              key={formatTime(time)}
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              className="text-8xl md:text-9xl font-light tracking-tighter tabular-nums"
            >
              {formatTime(time)}
            </motion.h1>
            <div className="absolute -bottom-4 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          {/* Date and Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8">
            <div className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-6 backdrop-blur-sm flex flex-col items-center justify-center gap-3 group hover:bg-white/[0.05] transition-colors">
              <Calendar size={18} className="text-white/30 group-hover:text-white/60 transition-colors" />
              <p className="text-sm font-medium text-white/80 capitalize">
                {formatDate(time)}
              </p>
              <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Data Atual</span>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-6 backdrop-blur-sm flex flex-col items-center justify-center gap-3 group hover:bg-white/[0.05] transition-colors">
              <Globe size={18} className="text-white/30 group-hover:text-white/60 transition-colors" />
              <p className="text-sm font-medium text-white/80">
                {getTimezone()}
              </p>
              <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Fuso Horário</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer Decoration */}
      <div className="absolute bottom-8 left-0 w-full flex justify-center opacity-20">
        <div className="flex gap-1">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-white" />
          ))}
        </div>
      </div>
    </div>
  );
}

