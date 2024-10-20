"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'; // Removed useRef
import emailjs from '@emailjs/browser';
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { CardContent, Card } from "./ui/card"
import { AvatarImage, AvatarFallback, Avatar } from "./ui/avatar"
import { Apple, ChevronDown , Fish, Salad, Calendar, Clock, Shield, ThumbsUp, Award, Dumbbell,Facebook, Instagram, Phone, Mail } from "lucide-react"
import Image from "next/image"

import CustomModal from './ui/customModal';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

// Custom Select component with TypeScript types
const Select: React.FC<SelectProps> = ({ children, ...props }) => (
  <select
    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    {...props}
  >
    {children}
  </select>
);






export default function NutritionistLandingPage() {

  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu toggle
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const toggleMenu = () => {
    setIsOpen(prev => !prev); // Toggle menu open/close
  };


  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['a-propos', 'services', 'consultation', 'temoignages', 'reservation'];
      let current = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            current = section;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);




  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consultationType: '',
    message: ''
  });
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await emailjs.send(
        'service_q49p9in',
        'template_8gp1h7t',
        {
          to_email: 'nutriffic.dz@gmail.com', // Your business email
          from_name: formData.name, // Client's name
          from_email: 'nutriffic.dz@gmail.com', // Your no-reply email
          reply_to: formData.email, // Client's email for replies
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          consultationType: formData.consultationType,
          message: formData.message
              },
        'Ar0473kau7tZaavFT'
      );
      
      console.log('Email successfully sent!', result.text);
      setConfirmationMessage(`Votre réservation pour une ${formData.consultationType} a été confirmée ! `);
      setIsModalOpen(true);
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        consultationType: '',
        message: ''
      });
    } catch (error) {
      console.error('Failed to send email:', error);
      setConfirmationMessage('Une erreur est survenue lors de l\'envoi de votre réservation. Veuillez réessayer plus tard.');
      setIsModalOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
<div className="flex flex-col min-h-screen bg-white items-center w-full max-w-none">
<header className="fixed top-0 left-0 right-0 bg-green-50 shadow-sm z-50 transition-all duration-300 ease-in-out">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center h-16">
          <a className="flex items-center justify-center" href="#">
  <img 
    src="/assets/nutriffics.png" 
    alt="Nutriffics Logo" 
    className="h-28 w-auto transition-transform duration-500 hover:scale-110"
    />
</a>

            <button
              className="lg:hidden flex flex-col items-center justify-center w-10 h-10 
                        border-2 rounded-md shadow-md 
                        bg-white border-green-600
                        hover:bg-green-600 hover:border-green-600 transition-colors duration-300 ease-in-out 
                        focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50"
              onClick={toggleMenu}
              aria-label="Toggle navigation"
            >
              <div className={`w-6 h-0.5 bg-green-600 transition-all duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-green-600 my-1 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-green-600 transition-all duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </button>

            <nav className={`lg:flex lg:items-center lg:w-auto ${isOpen ? 'block' : 'hidden'} absolute lg:relative top-16 lg:top-0 left-0 w-full lg:w-auto bg-green-50 lg:bg-transparent shadow-md lg:shadow-none`}>
              <ul className="lg:flex lg:justify-end items-center space-y-2 lg:space-y-0 p-4 lg:p-0">
                {['a-propos', 'services', 'consultation', 'temoignages', 'reservation'].map((section) => (
                  <li key={section} className="lg:ml-4">
                    <a
                      href={`#${section}`}
                      onClick={(e) => { e.preventDefault(); scrollToSection(section); }}
                      className={`block lg:inline-block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ease-in-out
                                ${activeSection === section ? 'text-white bg-green-600' : 'text-green-600 hover:bg-green-100'}`}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ')}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>



      <main className="flex-1 items-center w-full" > 
      <section 
  className="w-full h-screen bg-cover bg-center relative flex flex-col justify-between items-center"
  style={{
    backgroundImage: 'url("https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3")'
  }}
>
  <div className="absolute inset-0 bg-black opacity-50"></div>
  <div className="container px-4 md:px-6 relative z-10 flex-grow flex items-center">
    <div className="flex flex-col items-center space-y-6 text-center w-full">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl/none text-white shadow-text">
          Votre chemin vers une vie plus saine
        </h1>
        <p className="mx-auto max-w-[800px] text-xl md:text-2xl text-gray-200 shadow-text font-regular">
          Des programmes nutritionnels et sportifs personnalisés et des conseils pour vous aider à atteindre vos objectifs de santé.
        </p>
      </div>
      <div className="flex flex-col space-y-6 pt-8 w-full max-w-md mx-auto ">
  <Button
    className="bg-green-600 hover:bg-green-700 text-white w-full py-6 text-xl"
    onClick={() => scrollToSection('reservation')}
  >
    Réserver une consultation
  </Button>
  <Button 
    variant="outline" 
    className="text-green-600 border-green-600 hover:bg-green-50 w-full py-6 text-xl"
    onClick={() => scrollToSection('a-propos')}
  >
    En savoir plus
  </Button>
</div>

    </div>
  </div>
  <div className="relative z-10 pb-8 flex justify-center">
    <ChevronDown 
      className="text-white animate-bounce cursor-pointer "  
      size={48}
      onClick={() => scrollToSection('a-propos')}
    />
  </div>
</section>

<section id="a-propos" className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
  <div className="container px-4 md:px-6 mx-auto">
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
      {/* Text Section */}
      <div className="space-y-6 bg-gray-50 p-8 rounded-lg shadow-md">
        <h2 className="text-4xl font-extrabold text-green-700 tracking-tight">
          À propos de moi
        </h2>
        <p className="text-green-700 md:text-lg leading-relaxed">
          Je m'appelle <span className="font-bold">Qatar'ennada MESSIOUD</span>, nutritionniste diététicienne et coach de fitness et musculation en ligne, passionnée par mon métier. Diplômée de l'Institut National de l'Alimentation et de la Nutrition (INATAA) et certifiée par l'Académie Internationale pour la Formation et le Développement des Capacités Humaines (IACHCD), je suis engagée à fournir des services de haute qualité en toute sécurité.
        </p>
        <p className="text-green-700 md:text-lg leading-relaxed">
          Mes qualifications me permettent de suivre vos progrès, d’adapter vos entraînements et habitudes alimentaires pour atteindre vos objectifs. Je vous accompagne avec des conseils santé, alimentaires et sportifs personnalisés, en consultation à distance du samedi au jeudi.
        </p>
      </div>

      {/* Image Section */}
      <div className="flex justify-center lg:justify-end">
        <Image
          src="/assets/profile.jpg"
          alt="Portrait de la nutritionniste"
          width={400}
          height={400}
          className="rounded-full border-4 border-green-500"
        />
      </div>
    </div>
  </div>
</section>
        <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-white items-center">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center text-green-700">Nos Services</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-green-50 hover:shadow-md transition-shadow">
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Apple className="h-12 w-12 text-green-600" />
                  <h3 className="text-xl font-bold text-green-700">Programmes de repas personnalisés</h3>
                  <p className="text-center text-sm text-green-600">
                    Des programmes nutritionnels sur mesure adaptés à vos besoins et objectifs spécifiques.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-green-50 hover:shadow-md transition-shadow">
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Fish className="h-12 w-12 text-green-600" />
                  <h3 className="text-xl font-bold text-green-700">Programmes de repas personnalisés + suivi quotidien</h3>
                  <p className="text-center text-sm text-green-600">
                  Des programmes nutritionnels sur mesure adaptés à vos besoins et objectifs spécifiques + un suivi quotidien et repondre au questions de manière détaillée dans la journée.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-green-50 hover:shadow-md transition-shadow">
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Salad className="h-12 w-12 text-green-600" />
                  <h3 className="text-xl font-bold text-green-700">Ateliers de groupe</h3>
                  <p className="text-center text-sm text-green-600">
                    Des sessions interactives sur divers sujets de nutrition pour les groupes et les organisations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          <section id="programmes-sportifs" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center text-green-700">Programmes sportifs</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-green-50">
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Dumbbell className="h-12 w-12 text-green-600" />
                  <h3 className="text-xl font-bold text-green-700">Programme débutant</h3>
                  <p className="text-center text-sm text-green-600">
                    Idéal pour ceux qui commencent leur parcours fitness. Exercices simples et progressifs.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-green-50">
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Dumbbell className="h-12 w-12 text-green-600" />
                  <h3 className="text-xl font-bold text-green-700">Programme intermédiaire</h3>
                  <p className="text-center text-sm text-green-600">
                    Pour ceux qui veulent pousser leurs limites. Combinaison d'exercices de force et de cardio.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-green-50">
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Dumbbell className="h-12 w-12 text-green-600" />
                  <h3 className="text-xl font-bold text-green-700">Programme avancé</h3>
                  <p className="text-center text-sm text-green-600">
                    Défis intenses pour les athlètes expérimentés. Haute intensité et exercices complexes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        </section>
        <section id="consultation" className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
  <div className="container px-4 md:px-6 mx-auto">
    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center text-green-700">
      Déroulement de la consultation en ligne
    </h2>
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="text-green-600 leading-relaxed space-y-4">
          <p>• <span className="font-semibold">1er entretien & Bilan général</span> : J'ai besoin d’avoir un maximum d’informations sur toi. Avant de débuter le coaching, je propose un premier entretien avec un bilan général. Cet échange me permettra de mieux comprendre ton passé sportif, tes antécédents médicaux, tes douleurs, ton alimentation, ton mode de vie, etc.</p>
          
          <p>• Suite à l’entretien et au bilan, j’aurai toutes les cartes en main pour te proposer un programme de sport ou de nutrition adapté à tes objectifs. Je te ferai parvenir les grandes lignes de celui-ci quelques jours seulement après notre premier échange.</p>
          
          <p>• <span className="font-semibold">Un suivi quotidien</span> (si vous choisissez un coaching complet) : Tu as besoin de conseils ? Tu n’arrives pas à faire un exercice correctement ? Tu n’es pas certain de faire le bon mouvement ? Tu peux me joindre directement via WhatsApp et m’envoyer un message ou une vidéo. Je te réponds de manière détaillée dans la journée.</p>
        </div>
      </CardContent>
    </Card>
  </div>
</section>
<section id="avantages" className="w-full py-12 md:py-24 lg:py-32 bg-white">
  <div className="container px-4 md:px-6 mx-auto">
    <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl mb-12 text-center text-green-700">
      Consulter en ligne : les avantages
    </h2>
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      
      <Card className="bg-green-50 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardContent className="flex flex-col items-center space-y-4 p-8">
          <ThumbsUp className="h-12 w-12 text-green-600" />
          <h3 className="text-xl font-bold text-green-700 text-center">C'est efficace</h3>
          <p className="text-center text-sm text-gray-600">
            La consultation à distance est identique à celle qui se déroule dans mon cabinet. Visio par Skype, FaceTime, WhatsApp, téléphone ou mail : c'est vous qui choisissez.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-green-50 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardContent className="flex flex-col items-center space-y-4 p-8">
          <Clock className="h-12 w-12 text-green-600" />
          <h3 className="text-xl font-bold text-green-700 text-center">C'est rapide</h3>
          <p className="text-center text-sm text-gray-600">
            Ne perdez pas votre temps à vous déplacer. Les nouvelles technologies permettent de rester connecté et vous font gagner du temps.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-green-50 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardContent className="flex flex-col items-center space-y-4 p-8">
          <Shield className="h-12 w-12 text-green-600" />
          <h3 className="text-xl font-bold text-green-700 text-center">C'est discret</h3>
          <p className="text-center text-sm text-gray-600">
            Consulter en ligne vous permet de le faire en toute discrétion depuis chez vous, à votre propre rythme.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-green-50 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardContent className="flex flex-col items-center space-y-4 p-8">
          <Calendar className="h-12 w-12 text-green-600" />
          <h3 className="text-xl font-bold text-green-700 text-center">C'est pratique</h3>
          <p className="text-center text-sm text-gray-600">
            Choisissez la date et la plage horaire qui vous conviennent le mieux. Je consulte même le samedi.
          </p>
        </CardContent>
      </Card>
      
    </div>
  </div>
</section>
<section id="temoignages" className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
  <div className="container px-4 md:px-6 mx-auto">
    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center text-green-700 animate-fade-in-up">
      Témoignages de patients
    </h2>
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg transform transition-all hover:scale-105 animate-fade-in-up delay-100">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="animate-fade-in-right">
              <AvatarImage src="/assets/profile1.jpg" alt="Madame A" />
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-green-700">Madame A</h3>
              <p className="text-sm text-green-600">Cliente pendant un mois</p>
            </div>
          </div>
          <p className="text-green-600 mb-4">
            Suivi pour endométriose
          </p>
          <Image
            src="/assets/tem1.jpg"
            alt="Témoignage de Madame A"
            width={300}
            height={200}
            className="rounded-lg animate-fade-in-up"
          />
        </CardContent>
      </Card>

      <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg transform transition-all hover:scale-105 animate-fade-in-up delay-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="animate-fade-in-right">
              <AvatarImage src="/assets/profile2.jpg" alt="Madame S" />
              <AvatarFallback>MS</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-green-700">Madame S</h3>
              <p className="text-sm text-green-600">Cliente pendant 3 mois</p>
            </div>
          </div>
          <p className="text-green-600 mb-4">
            Suivi pour perte de poids
          </p>
          <Image
            src="/assets/tem2.jpg"
            alt="Témoignage de Madame S"
            width={300}
            height={200}
            className="rounded-lg animate-fade-in-up"
          />
        </CardContent>
      </Card>

      <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg transform transition-all hover:scale-105 animate-fade-in-up delay-300">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="animate-fade-in-right">
              <AvatarImage src="/assets/profile3.jpg" alt="Madame N" />
              <AvatarFallback>MN</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-green-700">Madame N</h3>
              <p className="text-sm text-green-600">Cliente pendant 2 mois</p>
            </div>
          </div>
          <p className="text-green-600 mb-4">
            Suivi pour perte de poids
          </p>
          <Image
            src="/assets/tem3.jpg"
            alt="Témoignage de Madame C"
            width={300}
            height={200}
            className="rounded-lg animate-fade-in-up"
          />
        </CardContent>
      </Card>
    </div>
  </div>
</section>
        <section id="qualifications" className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
  <div className="container px-4 md:px-6 mx-auto">
    <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl mb-12 text-center text-green-700">
      Diplômes et Certifications
    </h2>
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <Card className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardContent className="flex flex-col items-center space-y-4 p-8">
          <Award className="h-12 w-12 text-green-600" />
          <h3 className="text-xl font-bold text-green-700 text-center">Master en nutrition humaine</h3>
          <p className="text-center text-sm text-gray-600">
            Institut National de l’Alimentation, de la Nutrition et des Technologies Agroalimentaires (INATAA), 2022
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardContent className="flex flex-col items-center space-y-4 p-8">
          <Award className="h-12 w-12 text-green-600" />
          <h3 className="text-xl font-bold text-green-700 text-center">Certification en nutrithérapie et nutrition sportive</h3>
          <p className="text-center text-sm text-gray-600">
            Département de la formation professionnelle de la plateforme Diete.com, 2021
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardContent className="flex flex-col items-center space-y-4 p-8">
          <Award className="h-12 w-12 text-green-600" />
          <h3 className="text-xl font-bold text-green-700 text-center">Certification en coaching sportif (fitness et musculation)</h3>
          <p className="text-center text-sm text-gray-600">
            Académie Internationale pour la Formation et le Développement des Capacités Humaines (IACHCD), 2024
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
</section>
<section id="tarifs" className="w-full py-12 md:py-24 lg:py-32 bg-white">
  <div className="container px-4 md:px-6 mx-auto">
    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center text-green-700">
      Tarifs
    </h2>
    <div className="grid gap-8 md:grid-cols-2">
      {/* Consultation unique card */}
      <Card className="bg-green-50 shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl rounded-lg">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-green-700 mb-6 text-center">Consultation unique</h3>
          <ul className="space-y-4">
            <li className="flex justify-between items-center text-green-600">
              <span>Programme alimentaire uniquement </span>
              <span className="text-lg font-bold text-green-700">1500 da</span>
            </li>
            <li className="flex justify-between items-center text-green-600">
              <span>Programme sportif uniquement</span>
              <span className="text-lg font-bold text-green-700">1500 da</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Forfait suivi intensif card */}
      <Card className="bg-green-50 shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl rounded-lg">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-green-700 mb-6 text-center">Forfait suivi intensif</h3>
          <ul className="space-y-4">
            <li className="flex justify-between items-center text-green-600">
              <span>Consultation initiale + suivi quotidien (nutrition ou sport) (1 mois)</span>
              <span className="text-lg font-bold text-green-700">2500 da</span>
            </li>
            <li className="flex justify-between items-center text-green-600">
              <span> Consultation initiale + suivi quotidien (3 mois) (nutrition ou sport)</span>
              <span className="text-lg font-bold text-green-700">6000 da</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </div>
</section>
        <section id="reservation" className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center text-green-700">
          Réservez votre consultation
        </h2>
        <Card className="bg-white max-w-2xl mx-auto">
          <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
      <Input 
        placeholder="Votre Nom" 
        type="text" 
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
      <Input 
        placeholder="Votre Email" 
        type="email" 
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        required
      />
      <Input 
        placeholder="Votre Téléphone" 
        type="tel" 
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        required
      />
      <Select 
        name="consultationType"
        value={formData.consultationType}
        onChange={handleInputChange}
        required
      >
        <option value="">Choisissez le type de consultation</option>
        <option value="consultation unique">Consultation unique</option>
        <option value="forfait suivi intensif">Forfait suivi intensif</option>
      </Select>
      <Textarea 
        placeholder="Votre Message (optionnel)" 
        name="message"
        value={formData.message}
        onChange={handleInputChange}
      />
      <Button className="w-full bg-green-600 hover:bg-green-700 text-white" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Envoi en cours...' : 'Réserver ma consultation'}
      </Button>
    </form>
          </CardContent>
        </Card>
        {confirmationMessage && (
          <div className="mt-8 bg-green-50 border-l-4 border-green-400 text-green-800 p-4" role="alert">
            <p className="font-bold">Confirmation</p>
            <p>{confirmationMessage}</p>
          </div>
        )}
        
      </div>
    </section>
    <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={confirmationMessage}
      />
      </main>
      <footer className="w-full py-8 bg-gradient-to-b from-green-50 to-green-100 shadow-lg">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
      
      {/* Company Info and Contact */}
      <div className="text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start mt-2 space-x-2">
          <Phone size={20} className="text-green-600" />
          <a 
            href="tel:+213552659717" 
            className="text-sm font-medium text-green-700 hover:text-green-800 transition-colors"
          >
            +213 5 52 65 97 17
          </a>
        </div>
      </div>

      {/* Empty column for spacing */}
      <div></div>

      {/* Social Media */}
      <div className="flex justify-end items-center mt-4 md:mt-0">
        <div className="flex space-x-4">
          <a
            href="https://www.facebook.com/profile.php?id=61551291462426"
            aria-label="Facebook"
            className="text-green-600 hover:text-green-800 transition-colors"
          >
            <Facebook size={24} />
          </a>
          <a
            href="https://www.instagram.com/nutriffics/?next=%2F"
            aria-label="Instagram"
            className="text-green-600 hover:text-green-800 transition-colors"
          >
            <Instagram size={24} />
          </a>
          <a
            href="mailto:nutriffic.dz@gmail.com"
            aria-label="Instagram"
            className="text-green-600 hover:text-green-800 transition-colors"
          >
            <Mail size={24} />
          </a>
        </div>
      </div>
      
    </div>
  </div>
</footer>


    </div>
  )
}