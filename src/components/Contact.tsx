import { useState, useRef } from "react";
import { 
  Globe, Video, Send, Share2, Phone, Mail, 
  ShieldCheck, CheckCircle2, ArrowRight, Loader2, Sparkles 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/LangContext";
import { socials, contactInfo } from "../data/content";

/* ═══════════════════════════════════════════════════════════════════
   CONTACT COMPONENT
═══════════════════════════════════════════════════════════════════ */
export default function Contact() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", org: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setForm({ name: "", org: "", message: "" });
    }, 2000);
  };

  const channels = [
    { icon: Globe, label: t.contact.website, href: socials.website },
    { icon: Video, label: t.contact.youtube, href: socials.youtube },
    { icon: Send, label: t.contact.telegram, href: socials.telegram },
    { icon: Share2, label: t.contact.facebook, href: socials.facebook },
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-40 bg-paper-100 dark:bg-abyss-900 overflow-hidden">
      {/* Background Cinematic Depth */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-ink-900/10 dark:via-paper-50/10 to-transparent" />
      
      <div className="orb orb-teal w-[600px] h-[600px] -left-64 bottom-20 opacity-[0.06] dark:opacity-[0.12] blur-[120px]" />
      <div className="orb orb-gold w-[500px] h-[500px] -right-48 top-20 opacity-[0.05] dark:opacity-[0.1] blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="section-eyebrow mb-6 inline-block">{t.contact.eyebrow}</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif-am text-4xl sm:text-5xl lg:text-7xl text-ink-900 dark:text-paper-50 tracking-[-0.04em] mb-8 leading-[1.05]"
          >
            {t.contact.title}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-ink-500 dark:text-paper-200/60 leading-relaxed max-w-2xl"
          >
            {t.contact.subtitle}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10">
          
          {/* Left: Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative group h-full"
          >
            <div className="relative z-10 h-full rounded-[40px] bg-ink-900 dark:bg-ink-800 p-10 sm:p-14 text-paper-50 overflow-hidden shadow-2xl">
              {/* Internal Mesh Background */}
              <div className="absolute inset-0 opacity-10">
                <div className="orb orb-teal w-full h-full scale-150 animate-pulse" />
              </div>
              
              <div className="relative z-20 flex flex-col h-full">
                {/* Brand Badge */}
                <div className="flex items-center gap-3 mb-12">
                   <div className="p-2.5 rounded-xl bg-seal-400/20 text-seal-400">
                     <ShieldCheck size={20} strokeWidth={1.5} />
                   </div>
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] text-seal-300">
                     Licensed {t.contact.licenseValue}
                   </span>
                </div>

                {/* Contact Rows */}
                <div className="space-y-12 flex-1">
                  <div className="group/row">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-paper-50/40 mb-3 flex items-center gap-2">
                       <div className="w-1 h-1 rounded-full bg-seal-400" />
                       Direct Connect
                    </div>
                    <div className="flex flex-col gap-4">
                      <a href={`tel:${contactInfo.mobile1}`} className="text-2xl sm:text-3xl font-serif-am text-paper-50 hover:text-seal-400 transition-colors flex items-center gap-3">
                         <Phone size={20} className="text-seal-400/50" />
                         {contactInfo.mobile1}
                      </a>
                      <a href={`tel:${contactInfo.mobile2}`} className="text-2xl sm:text-3xl font-serif-am text-paper-50 hover:text-seal-400 transition-colors flex items-center gap-3">
                         <Phone size={20} className="text-seal-400/50" />
                         {contactInfo.mobile2}
                      </a>
                    </div>
                  </div>

                  <div className="group/row">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-paper-50/40 mb-3 flex items-center gap-2">
                       <div className="w-1 h-1 rounded-full bg-teal-500" />
                       Digital Correspondence
                    </div>
                    <a href={`mailto:${contactInfo.email}`} className="text-2xl sm:text-3xl font-serif-am text-paper-50 hover:text-teal-400 transition-colors flex items-center gap-3 break-all">
                       <Mail size={20} className="text-teal-500/50" />
                       {contactInfo.email}
                    </a>
                  </div>
                </div>

                {/* Social Grid */}
                <div className="mt-16 pt-10 border-t border-paper-50/10">
                  <div className="grid grid-cols-2 gap-4">
                    {channels.map((c) => (
                      <a 
                        key={c.label} 
                        href={c.href} 
                        target="_blank" 
                        className="flex items-center gap-3 p-4 rounded-2xl bg-paper-50/5 hover:bg-paper-50/10 border border-paper-50/5 transition-all duration-300 group/social"
                      >
                        <c.icon size={18} className="text-seal-400 group-hover/social:scale-110 transition-transform" />
                        <span className="text-[11px] font-bold text-paper-50/70">{c.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background floating element */}
            <div className="absolute -inset-4 rounded-[44px] border border-seal-400/10 -z-10 bg-seal-400/5 backdrop-blur-[2px]" />
          </motion.div>

          {/* Right: Immersive Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            <div className="relative flex-1 p-8 sm:p-12 rounded-[40px] bg-paper-50/60 dark:bg-paper-50/[0.02] border border-ink-900/10 dark:border-paper-50/8 backdrop-blur-2xl shadow-xl overflow-hidden">
               
               <AnimatePresence mode="wait">
                 {!sent ? (
                   <motion.form 
                     key="form"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0, y: -20 }}
                     onSubmit={handleSubmit}
                     className="relative z-10 space-y-10"
                   >
                     {/* Form Inputs with premium transitions */}
                     <div className="grid sm:grid-cols-2 gap-10">
                        <div className="relative group/input">
                           <input 
                             required
                             type="text" 
                             value={form.name}
                             onChange={(e) => setForm({...form, name: e.target.value})}
                             placeholder={t.contact.formName}
                             className="w-full bg-transparent border-b-2 border-ink-900/10 dark:border-paper-50/10 py-4 text-lg text-ink-900 dark:text-paper-50 focus:outline-none focus:border-seal-400 transition-colors placeholder:text-ink-300 dark:placeholder:text-paper-50/20"
                           />
                           <div className="absolute bottom-0 left-0 h-0.5 w-full bg-seal-400 transform scale-x-0 group-focus-within/input:scale-x-100 transition-transform" />
                        </div>
                        <div className="relative group/input">
                           <input 
                             type="text" 
                             value={form.org}
                             onChange={(e) => setForm({...form, org: e.target.value})}
                             placeholder={t.contact.formOrg}
                             className="w-full bg-transparent border-b-2 border-ink-900/10 dark:border-paper-50/10 py-4 text-lg text-ink-900 dark:text-paper-50 focus:outline-none focus:border-teal-500 transition-colors placeholder:text-ink-300 dark:placeholder:text-paper-50/20"
                           />
                           <div className="absolute bottom-0 left-0 h-0.5 w-full bg-teal-500 transform scale-x-0 group-focus-within/input:scale-x-100 transition-transform" />
                        </div>
                     </div>

                     <div className="relative group/input">
                        <textarea 
                          required
                          rows={4}
                          value={form.message}
                          onChange={(e) => setForm({...form, message: e.target.value})}
                          placeholder={t.contact.formMessage}
                          className="w-full bg-transparent border-b-2 border-ink-900/10 dark:border-paper-50/10 py-4 text-lg text-ink-900 dark:text-paper-50 focus:outline-none focus:border-seal-400 transition-colors placeholder:text-ink-300 dark:placeholder:text-paper-50/20 resize-none"
                        />
                        <div className="absolute bottom-0 left-0 h-0.5 w-full bg-seal-400 transform scale-x-0 group-focus-within/input:scale-x-100 transition-transform" />
                     </div>

                     <button 
                       disabled={loading}
                       type="submit"
                       className="group relative w-full sm:w-auto px-10 py-5 rounded-2xl bg-ink-900 dark:bg-paper-50 text-paper-50 dark:text-ink-900 font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70"
                     >
                       {loading ? (
                         <Loader2 className="animate-spin" size={20} />
                       ) : (
                         <>
                           {t.contact.sendBtn}
                           <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                         </>
                       )}
                       
                       {/* Subtle inner glow */}
                       <div className="absolute inset-0 rounded-2xl bg-seal-400/0 group-hover:bg-seal-400/5 transition-colors" />
                     </button>
                   </motion.form>
                 ) : (
                   <motion.div 
                     key="success"
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="h-full flex flex-col items-center justify-center text-center p-12"
                   >
                     <div className="w-24 h-24 rounded-full bg-seal-400 flex items-center justify-center mb-8 shadow-seal-lg">
                        <CheckCircle2 size={48} className="text-ink-900" strokeWidth={3} />
                     </div>
                     <h3 className="text-3xl font-serif-am text-ink-900 dark:text-paper-50 mb-4">{t.contact.successTitle}</h3>
                     <p className="text-lg text-ink-500 dark:text-paper-400/60 max-w-sm mb-10">{t.contact.successDesc}</p>
                     <button 
                       onClick={() => setSent(false)}
                       className="text-sm font-bold text-seal-600 dark:text-seal-400 hover:underline flex items-center gap-2"
                     >
                        <Sparkles size={16} /> Send another message
                     </button>
                   </motion.div>
                 )}
               </AnimatePresence>

               {/* Decorative floating icon */}
               <div className="absolute -top-12 -right-12 w-48 h-48 bg-teal-500/5 dark:bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
            </div>
            
            <p className="mt-8 text-center text-xs text-ink-400 dark:text-paper-400/40 font-medium">
               Estimated Response Time: <span className="text-seal-600 dark:text-seal-400">Within 24 Hours</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
