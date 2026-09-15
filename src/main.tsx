import React, {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {motion, useReducedMotion, useScroll, useTransform} from 'motion/react';
import {CalendarBlank, MapPin, MusicNotes, FlowerLotus, Sparkle, ArrowDown, SpeakerSlash} from '@phosphor-icons/react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import './styles.css';

// Engagement Ceremony: Friday, 5 February 2027, 6:30 PM onwards (Malaysia Time UTC+8)
const ENGAGEMENT_DATE = new Date('2027-02-05T18:30:00+08:00');

const events = [
  {
    name: 'Guest Welcoming & Swagatham',
    date: 'Friday, 5 February 2027',
    time: '6:30 PM',
    venue: 'Dewan G. Manogaran, SJKT Cantuman Chaah',
    note: 'Welcoming our esteemed families, relatives, and cherished friends with auspicious rose water, kalkandu, and traditional South Indian hospitality.',
    icon: '✦'
  },
  {
    name: 'Traditional Nichayathartham',
    date: 'Friday, 5 February 2027',
    time: '7:00 PM',
    venue: 'Dewan G. Manogaran, SJKT Cantuman Chaah',
    note: 'Auspicious Ganapathi prayer, exchange of ceremonial Thamboolam plates, silk saree presentation, and formal announcement of the union by elders.',
    icon: '🪷'
  },
  {
    name: 'Exchange of Rings & Garlands',
    date: 'Friday, 5 February 2027',
    time: '7:45 PM',
    venue: 'Dewan G. Manogaran, SJKT Cantuman Chaah',
    note: 'The defining moment as Charles Arvind & Lavania exchange their engagement rings and floral garlands, sealing a sacred promise of forever.',
    icon: '💍'
  },
  {
    name: 'Celebratory Feast & Blessings',
    date: 'Friday, 5 February 2027',
    time: '8:15 PM onwards',
    venue: 'Dewan G. Manogaran, SJKT Cantuman Chaah',
    note: 'Join us for a sumptuous dinner, photo memories with the newly engaged couple, and an evening filled with joyous laughter and blessings.',
    icon: '✨'
  }
];

function Reveal({children, className=''}:{children:React.ReactNode,className?:string}){
 const reduce=useReducedMotion();
 return <motion.div className={className} initial={reduce?false:{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.75,ease:[.16,1,.3,1]}}>{children}</motion.div>
}

function Countdown(){
 const [now,setNow]=useState(Date.now());
 useEffect(()=>{const id=setInterval(()=>setNow(Date.now()),1000);return()=>clearInterval(id)},[]);
 const diff=Math.max(0,ENGAGEMENT_DATE.getTime()-now);
 const values=[Math.floor(diff/86400000),Math.floor(diff/3600000)%24,Math.floor(diff/60000)%60,Math.floor(diff/1000)%60];
 return <div className="countdown">{values.map((v,i)=><div className="count-unit" key={i}><div className="flip"><motion.span key={v} initial={{rotateX:-75,opacity:0}} animate={{rotateX:0,opacity:1}}>{String(v).padStart(2,'0')}</motion.span></div><small>{['days','hours','mins','secs'][i]}</small></div>)}</div>
}

function Bloom({onDone}:{onDone:()=>void}){
 const reduce=useReducedMotion(); const [open,setOpen]=useState(false);
 return <motion.div className={'welcome-card '+(open?'is-open':'')} animate={open&&!reduce?{scale:1.04,opacity:0}:{}} transition={{duration:.75,ease:[.16,1,.3,1]}}>
  <div className="welcome-names">
   <small>Together with our families</small>
   <h1>Charles Arvind <i>&</i> Lavania</h1>
   <p className="welcome-subtitle">cordially invite you to their</p>
   <div className="welcome-tag">Engagement Ceremony</div>
   <div className="welcome-tamil">நிச்சயதார்த்தம் · Nichayathartham</div>
   <span>05 · 02 · 2027</span>
  </div>
  <motion.button aria-label="Open Charles Arvind and Lavania's invitation" className="open-invite" onClick={()=>{setOpen(true);onDone()}} whileTap={{scale:.97}}>
   <span className="seal"><FlowerLotus size={25} weight="fill"/></span>
   <b>Open our invitation</b>
   <small>♫ Kadhalaada · Tap to enter</small>
  </motion.button>
 </motion.div>
}

function addCalendar(){
 const body=[
  'BEGIN:VCALENDAR',
  'VERSION:2.0',
  'BEGIN:VEVENT',
  'DTSTART:20270205T103000Z',
  'DTEND:20270205T153000Z',
  'SUMMARY:Charles Arvind & Lavania — Engagement Ceremony (Nichayathartham)',
  'LOCATION:Dewan G. Manogaran, SJKT Cantuman Chaah, Jalan Seri Pagi, 85400 Chaah, Johor Darul Ta\'zim, Malaysia',
  'DESCRIPTION:Celebrate the Engagement Ceremony (Nichayathartham) of Charles Arvind Sethuraman Vairavan & Lavania Ramarao at Dewan G. Manogaran, Chaah, Johor.',
  'END:VEVENT',
  'END:VCALENDAR'
 ].join('\r\n');
 const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([body],{type:'text/calendar'})); a.download='charles-lavania-engagement.ics'; a.click(); URL.revokeObjectURL(a.href);
}

function ScratchDate(){
 const canvas=useRef<HTMLCanvasElement>(null); const [done,setDone]=useState(false); const drawing=useRef(false); const strokes=useRef(0);
 useEffect(()=>{const c=canvas.current;if(!c)return;const ratio=Math.min(devicePixelRatio,2);const rect=c.getBoundingClientRect();c.width=rect.width*ratio;c.height=rect.height*ratio;const x=c.getContext('2d')!;x.scale(ratio,ratio);const g=x.createLinearGradient(0,0,rect.width,rect.height);g.addColorStop(0,'#d7a94f');g.addColorStop(.5,'#f0d08a');g.addColorStop(1,'#a76d1c');x.fillStyle=g;x.fillRect(0,0,rect.width,rect.height);x.fillStyle='#633f1f';x.textAlign='center';x.font='11px Marcellus, serif';x.fillText('SCRATCH TO REVEAL ENGAGEMENT DATE',rect.width/2,rect.height/2-6);x.font='25px serif';x.fillText('💍',rect.width/2,rect.height/2+29)},[]);
 const scratch=(e:React.PointerEvent<HTMLCanvasElement>)=>{if(!drawing.current||done)return;const c=canvas.current!,r=c.getBoundingClientRect(),x=c.getContext('2d')!;x.globalCompositeOperation='destination-out';x.beginPath();x.arc(e.clientX-r.left,e.clientY-r.top,24,0,Math.PI*2);x.fill();if(++strokes.current>42){setDone(true);c.style.opacity='0';navigator.vibrate?.(35)}};
 return <section className={'scratch-section '+(done?'revealed':'')}><div className="float-field" aria-hidden="true">{Array.from({length:12},(_,i)=><i key={i} style={{'--i':i} as React.CSSProperties}>❀</i>)}</div><Reveal><p className="script">Save our date</p><h2>An Auspicious Evening</h2><div className="scratch-card"><div className="date-reveal"><small>Friday</small><b>05</b><span>February · 2027</span><em>6:30 PM onwards · Chaah, Johor</em></div><canvas ref={canvas} onPointerDown={e=>{drawing.current=true;e.currentTarget.setPointerCapture(e.pointerId);scratch(e)}} onPointerMove={scratch} onPointerUp={()=>drawing.current=false} onPointerCancel={()=>drawing.current=false}/></div><p className="scratch-hint">{done?'We look forward to blessing our union together ♡':'Use your finger to uncover the date'}</p></Reveal></section>
}

function App(){
 const [entered,setEntered]=useState(false);
 const [introPlaying,setIntroPlaying]=useState(false);
 const [isPlaying,setIsPlaying]=useState(false);
 const introVideo=useRef<HTMLVideoElement>(null);
 const audioRef=useRef<HTMLAudioElement>(null);
 const reduce=useReducedMotion();
 const {scrollYProgress}=useScroll();
 const leafY=useTransform(scrollYProgress,[0,1],[0,180]);
 const templeY=useTransform(scrollYProgress,[0,1],[0,95]);
 const page=useRef<HTMLElement>(null);

 const startExperience=()=>{
  const v=introVideo.current;
  if(v){
   v.currentTime=0;
   setIntroPlaying(true);
   void v.play().catch(()=>setIntroPlaying(false));
  }
  if(audioRef.current){
   audioRef.current.play().then(()=>setIsPlaying(true)).catch(()=>{});
  }
 };

 const toggleMusic=()=>{
  if(!audioRef.current)return;
  if(isPlaying){
   audioRef.current.pause();
   setIsPlaying(false);
  }else{
   audioRef.current.play().then(()=>setIsPlaying(true)).catch(()=>{});
  }
 };

 useEffect(()=>{if(reduce||!entered||!page.current)return;gsap.registerPlugin(ScrollTrigger);const ctx=gsap.context(()=>{
  gsap.fromTo('.hero-copy>*',{opacity:0,y:30},{opacity:1,y:0,duration:1,stagger:.12,ease:'power3.out'});
  gsap.to('.hero-art',{scale:1.09,yPercent:7,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
  gsap.utils.toArray<HTMLElement>('.event').forEach((el,i)=>gsap.fromTo(el,{opacity:0,x:i%2?-42:42,rotate:.5},{opacity:1,x:0,rotate:0,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 86%',end:'top 58%',scrub:.8}}));
  gsap.fromTo('.ceremony-image img',{scale:1.18,yPercent:-5},{scale:1,yPercent:5,ease:'none',scrollTrigger:{trigger:'.ceremony-image',start:'top bottom',end:'bottom top',scrub:1}});
  gsap.fromTo('.story-inner',{clipPath:'inset(0 50% 0 50%)',opacity:.4},{clipPath:'inset(0 0% 0 0%)',opacity:1,ease:'power2.out',scrollTrigger:{trigger:'.story',start:'top 80%',end:'center 55%',scrub:1}});
  gsap.to('.map i',{y:-10,repeat:-1,yoyo:true,duration:1.2,ease:'sine.inOut'});
  gsap.utils.toArray<HTMLElement>('.atmos-lantern').forEach((el,i)=>{const depth=Number(el.dataset.depth||.4);gsap.to(el,{yPercent:-90*depth,x:Math.sin(i)*18*depth,rotation:i%2?4:-4,ease:'none',scrollTrigger:{trigger:page.current,start:'top top',end:'bottom bottom',scrub:1.2+depth}});gsap.to(el.querySelector('.lantern-flame'),{scaleY:1.18,opacity:.72,repeat:-1,yoyo:true,duration:.7+i*.08,ease:'sine.inOut'})});
 },page);return()=>ctx.revert()},[entered,reduce]);

 return <main ref={page}>
  {/* Audio element for preferred song: Kadhalaada from Vivegam (timing 1:44 onwards) */}
  <audio ref={audioRef} src="/assets/kadhalaada-engagement.mp3" loop preload="auto"/>

  {/* Floating Music Control Button */}
  <div className="music-player-widget">
   <button
    className={'music-pill '+(isPlaying?'playing':'')}
    onClick={toggleMusic}
    aria-label={isPlaying?'Pause background music':'Play background music'}
    title="♫ Kadhalaada — Vivegam (1:44 onwards)"
   >
    <span className="music-icon-wrap">
     {isPlaying?<MusicNotes size={18} weight="fill"/>:<SpeakerSlash size={18} weight="regular"/>}
    </span>
    <span className="music-label">
     <span className="music-title">Kadhalaada</span>
     <span className="music-sub">Vivegam · 1:44</span>
    </span>
    <span className="sound-waves" aria-hidden="true">
     <i/><i/><i/>
    </span>
   </button>
  </div>

  <motion.div className="scroll-progress" style={{scaleX:scrollYProgress}}/>
  <div className="lantern-atmosphere" aria-hidden="true">{[
   {x:6,y:12,d:.22,s:.62,b:2.2},{x:89,y:20,d:.35,s:.78,b:1.4},{x:12,y:42,d:.7,s:1.05,b:.4},{x:93,y:55,d:.28,s:.58,b:2.6},{x:4,y:72,d:1,s:1.35,b:.2},{x:87,y:84,d:.62,s:.92,b:.8},{x:48,y:64,d:.18,s:.42,b:3.2}
  ].map((l,i)=><span key={i} className="atmos-lantern" data-depth={l.d} style={{left:`${l.x}%`,top:`${l.y}%`,'--scale':l.s,'--blur':`${l.b}px`,'--delay':`${-i*.6}s`} as React.CSSProperties}><i className="lantern-chain"/><i className="lantern-cap"/><i className="lantern-body"><b className="lantern-flame"/></i><i className="lantern-tail"/></span>)}</div>

  {!entered&&<div className={'welcome '+(introPlaying?'intro-playing':'')}>
   <video
    ref={introVideo}
    className="welcome-video"
    muted
    playsInline
    preload="auto"
    poster="/assets/entrance-first-frame.png"
    onEnded={()=>{setEntered(true);if(audioRef.current&&!isPlaying){audioRef.current.play().then(()=>setIsPlaying(true)).catch(()=>{})}}}
    aria-label="Charles Arvind and Lavania's illustrated engagement invitation opening"
   >
    <source src="/assets/aarav-ananya-opening.mp4" type="video/mp4"/>
   </video>
   <div className="welcome-shade"/>
   <div className="garland-edge"/>
   {!introPlaying&&<Bloom onDone={startExperience}/>}
   {introPlaying&&<button className="skip-intro" onClick={()=>{setEntered(true);if(audioRef.current&&!isPlaying){audioRef.current.play().then(()=>setIsPlaying(true)).catch(()=>{})}}}>Skip intro</button>}
  </div>}

  {/* Hero Section */}
  <section className="hero">
   <motion.img className="hero-art" src="/assets/invitation-reference.png" alt="South Indian temple gopuram, framed by jasmine, golden lamps, and lotus flowers" style={{y:reduce?0:templeY}} />
   <div className="hero-scrim"/>
   <motion.div className="hero-copy" initial={{opacity:0,y:24}} animate={{opacity:entered?1:0,y:entered?0:24}} transition={{delay:.15,duration:1}}>
    <p className="blessing">With the blessings of our families</p>
    <div className="event-kicker">Engagement Ceremony</div>
    <div className="tamil-hero-subtitle">நிச்சயதார்த்தம் · Nichayathartham</div>
    <h1>Charles Arvind <span>&</span> Lavania</h1>
    <p className="full-names">Charles Arvind Sethuraman Vairavan & Lavania Ramarao</p>
    <div className="date-rule"><i/>05 · 02 · 2027<i/></div>
    <p className="venue-tag">Dewan G. Manogaran · Chaah, Johor, Malaysia</p>
   </motion.div>
   <motion.div className="leaf-float left" style={{y:reduce?0:leafY}}/>
   <motion.div className="leaf-float right" style={{y:reduce?0:leafY}}/>
   <div className="scroll-cue"><ArrowDown size={20}/><span>Our Celebration</span></div>
  </section>

  {/* Countdown */}
  <section className="count-section">
   <Reveal>
    <p className="kicker">Until our sacred promise</p>
    <h2>Counting Every Heartbeat</h2>
    <Countdown/>
   </Reveal>
  </section>

  {/* Scratch Card */}
  <ScratchDate/>

  {/* Story & Sacred Promise */}
  <section className="story ornamental">
   <Reveal className="story-inner">
    <FlowerLotus size={34} weight="thin"/>
    <p className="script">A Sacred Promise</p>
    <h2>Two Paths, One Forever</h2>
    <p>
     With the divine blessings of the Almighty and our parents, we, Charles Arvind and Lavania, joyfully unite to formalize our bond of love and companionship.
     Surrounded by the warmth of family, tradition, and sacred prayers, we step forward onto this cherished journey together.
    </p>
    <div className="signature">Charles Arvind <i>&</i> Lavania</div>
   </Reveal>
  </section>

  {/* Couple Monogram & Royal Crest Section (Addressing client's request for initials CL instead of photos) */}
  <section className="monogram-showcase">
   <Reveal className="monogram-inner">
    <div className="crest-badge-wrap">
     <img
      src="/assets/couple-monogram.jpg"
      alt="Charles Arvind & Lavania - Royal Wedding Monogram Crest CL"
      className="royal-crest-img"
      loading="lazy"
     />
     <div className="crest-shimmer"/>
    </div>
    <p className="script">The Royal Monogram</p>
    <h2>CL · Charles Arvind & Lavania</h2>
    <p className="monogram-text">
     An emblem of tradition, love, and unity. Gracefully adorned with the auspicious blessings of Lord Ganesha, regal peacocks, and blossoming jasmine garlands.
    </p>
    <div className="monogram-divider"><span>❦</span></div>
   </Reveal>
  </section>

  {/* Engagement Thamboolam Ritual (Changed from Haldi to Engagement background as explicitly requested in chat) */}
  <section className="ceremony-moment">
   <div className="floating-glass lotus-one">✿</div>
   <div className="floating-glass lotus-two">❀</div>
   <div className="floating-diya">◒</div>
   <div className="ceremony-image">
    <img
     src="/assets/engagement-ritual.jpg"
     loading="lazy"
     alt="South Indian traditional Nichayathartham engagement ceremony thamboolam plate with rings, silk saree, and lit kuthu vilakku"
    />
   </div>
   <Reveal className="ceremony-caption">
    <p className="script">Nichayathartham · நிச்சயதார்த்தம்</p>
    <h2>Sealed with Love & Tradition</h2>
    <p>
     The ceremonial thamboolam plate, the sparkle of diamond rings, the auspicious glow of the kuthu vilakku, and the sacred blessings of our elders marking the formal promise of our marriage.
    </p>
    <span>Scroll below for the engagement ceremony program</span>
   </Reveal>
  </section>

  {/* Engagement Events / Order of Ceremony (Replacing the 5-day wedding festivities as requested in chat) */}
  <section className="events">
   <Reveal>
    <div className="event-section-badge">Order of Ceremony</div>
    <h2>Engagement Festivities</h2>
    <p className="section-intro">
     An auspicious evening of ritual, music, and joy celebrating the union of Charles Arvind & Lavania.
    </p>
   </Reveal>
   <div className="event-list">
    {events.map((e,i)=>(
     <Reveal className={'event '+(i===2?'featured':'')} key={e.name}>
      <div className="event-number">0{i+1}</div>
      <div>
       <span className="event-icon">{e.icon}</span>
       <h3>{e.name}</h3>
       <p>{e.note}</p>
       <dl>
        <div><dt>Date</dt><dd>{e.date}</dd></div>
        <div><dt>Time</dt><dd>{e.time}</dd></div>
        <div><dt>Venue</dt><dd>{e.venue}</dd></div>
       </dl>
      </div>
     </Reveal>
    ))}
   </div>
  </section>

  {/* Venue & Map Section */}
  <section className="venue ornamental">
   <Reveal>
    <MapPin size={38} weight="thin"/>
    <p className="script">Join Us In Celebration</p>
    <h2>Dewan G. Manogaran</h2>
    <p className="venue-address">
     SJKT Cantuman Chaah, Jalan Seri Pagi, 85400 Chaah, Johor Darul Ta'zim, Malaysia
    </p>
    <div className="map google-map">
     <iframe
      title="Google Map of Dewan G. Manogaran, Chaah, Johor"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      src="https://maps.google.com/maps?q=Dewan%20G.%20Manogaran%20SJKT%20Cantuman%20Chaah%20Jalan%20Seri%20Pagi%2085400%20Chaah%20Johor&t=&z=15&ie=UTF8&iwloc=&output=embed"
     />
     <div className="map-overlay">
      <span><MapPin size={19} weight="fill"/>Engagement Venue</span>
      <b>Dewan G. Manogaran</b>
      <small>Chaah, Johor Darul Ta'zim, Malaysia</small>
     </div>
    </div>
    <div className="actions">
     <a
      className="button primary"
      href="https://maps.app.goo.gl/U9rpMLo5NnvqootUA"
      target="_blank"
      rel="noreferrer"
     >
      <MapPin size={19}/>Open in Google Maps
     </a>
     <button className="button secondary" onClick={addCalendar}>
      <CalendarBlank size={19}/>Add to Calendar
     </button>
    </div>
   </Reveal>
  </section>

  {/* Footer */}
  <footer>
   <img
    src="/assets/couple-monogram.jpg"
    loading="lazy"
    alt="Charles Arvind & Lavania Engagement Crest"
   />
   <div className="footer-overlay"/>
   <Reveal className="footer-copy">
    <Sparkle size={27} weight="thin"/>
    <p>We eagerly await to celebrate with you</p>
    <h2>Charles Arvind <i>&</i> Lavania</h2>
    <div className="footer-subtitle">Charles Arvind Sethuraman Vairavan & Lavania Ramarao</div>
    <span>5 February 2027 · 6:30 PM onwards · Chaah, Johor, Malaysia</span>
   </Reveal>
   <a
    href="https://www.instagram.com/invitestory.in/"
    target="_blank"
    rel="noreferrer"
    style={{
     position:'relative',
     zIndex:2,
     display:'block',
     marginTop:'16px',
     fontSize:'8px',
     textTransform:'uppercase',
     letterSpacing:'.18em',
     color:'rgba(255,242,214,.45)',
     textDecoration:'none',
     paddingBottom:'16px'
    }}
   >
    Personalised with love by @invitestory.in
   </a>
  </footer>
 </main>
}

createRoot(document.getElementById('root')!).render(<App/>);
