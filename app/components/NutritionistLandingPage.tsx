"use client";

import { useState } from 'react';
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/texarea"
import { CardContent, Card } from "./ui/card"
import { AvatarImage, AvatarFallback, Avatar } from "./ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Apple, Carrot, Fish, Salad, Calendar, Phone, Mail, Clock, Shield, ThumbsUp, Award, Dumbbell } from "lucide-react"
import Image from "next/image"

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
  const toggleMenu = () => {
    setIsOpen(prev => !prev); // Toggle menu open/close
  };
  const [reservationType, setReservationType] = useState('');

  const handleReservation = (type: string) => {
    setReservationType(type);

    // Simuler une réservation (ici vous pouvez appeler une API)
    setTimeout(() => {
      setConfirmationMessage(`Votre réservation pour une ${type} a été confirmée !`);
      setReservationType(''); // Réinitialiser le type de réservation après confirmation
    }, 1000); // Simuler un délai de traitement de 1 seconde
  };


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consultationType: '',
    message: ''
  });
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setConfirmationMessage(`Votre réservation pour une ${formData.consultationType} a été confirmée !`);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      consultationType: '',
      message: ''
    });
  };



  return (
    <div className="flex flex-col min-h-screen bg-white items-center">
      <header className="flex justify-between items-center w-full px-4 lg:px-6 h-16 bg-green-50 shadow-sm transition-all duration-300 ease-in-out sticky top-0 z-50">
        <a className="flex items-center justify-center animate-bounce-once" href="#">
          <Carrot className="h-8 w-8 text-green-600 transition-transform duration-500 hover:scale-110" />
          <span className="ml-2 text-xl font-bold text-green-700 transition-all duration-500">NutriVie</span>
        </a>

        {/* Hamburger menu for mobile */}
        <button
          className={`lg:hidden flex flex-col items-center justify-center w-10 h-10 
                      border-2 rounded-md shadow-md 
                      ${isOpen ? 'bg-green-600 border-green-600' : 'bg-white border-green-600'}
                      hover:bg-green-600 hover:border-green-600 transition-colors duration-300 ease-in-out 
                      focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50`}
          onClick={toggleMenu} // Toggle mobile menu
          aria-label="Toggle navigation"
        >
          <div className={`w-6 h-0.5 transition-transform duration-300 ease-in-out ${isOpen ? 'bg-white transform rotate-45 translate-y-1.5' : 'bg-green-600'}`}></div>
          <div className={`w-6 h-0.5 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'bg-green-600'}`}></div>
          <div className={`w-6 h-0.5 transition-transform duration-300 ease-in-out ${isOpen ? 'bg-white transform -rotate-45 -translate-y-1.5' : 'bg-green-600'}`}></div>
        </button>

        {/* Navigation links */}
        <nav className={`lg:flex lg:gap-4 sm:gap-6 ${isOpen ? 'flex flex-col absolute top-16 left-0 w-full bg-green-50 p-4 shadow-md' : 'hidden'}`}>
          <a className="text-sm font-medium text-green-600 hover:text-green-800 relative transition-all duration-300 ease-in-out" href="#a-propos" onClick={toggleMenu}>
            À propos
            <span className="underline-animation"></span>
          </a>
          <a className="text-sm font-medium text-green-600 hover:text-green-800 relative transition-all duration-300 ease-in-out" href="#services" onClick={toggleMenu}>
            Services
            <span className="underline-animation"></span>
          </a>
          <a className="text-sm font-medium text-green-600 hover:text-green-800 relative transition-all duration-300 ease-in-out" href="#consultation" onClick={toggleMenu}>
            Consultation
            <span className="underline-animation"></span>
          </a>
          <a className="text-sm font-medium text-green-600 hover:text-green-800 relative transition-all duration-300 ease-in-out" href="#temoignages" onClick={toggleMenu}>
            Témoignages
            <span className="underline-animation"></span>
          </a>
          <a className="text-sm font-medium text-green-600 hover:text-green-800 relative transition-all duration-300 ease-in-out" href="#reservation" onClick={toggleMenu}>
            Réservation
            <span className="underline-animation"></span>
          </a>
          <a className="text-sm font-medium text-green-600 hover:text-green-800 relative transition-all duration-300 ease-in-out" href="#contact" onClick={toggleMenu}>
            Contact
            <span className="underline-animation"></span>
          </a>
        </nav>
      </header>



      <main className="flex-1 items-center">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-cover bg-center  " style={{backgroundImage: 'url("https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&q=80&w=1932&ixlib=rb-4.0.3")'}}>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-green-800 drop-shadow-lg">
                  Votre chemin vers une vie plus saine
                </h1>
                <p className="mx-auto max-w-[700px] text-green-700 md:text-xl drop-shadow">
                  Des plans nutritionnels personnalisés et des conseils d'experts pour vous aider à atteindre vos objectifs de santé.
                </p>
              </div>
              <div className="space-x-4">
                <Button className="bg-green-600 hover:bg-green-700 text-white">Réserver une consultation</Button>
                <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">En savoir plus</Button>
              </div>
            </div>
          </div>
        </section>
        <section id="a-propos" className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-2">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-green-700">À propos de moi</h2>
                <p className="max-w-[600px] text-green-600 md:text-xl">
                  Avec plus de 10 ans d'expérience en nutrition et diététique, je suis passionnée par l'aide aux personnes qui souhaitent transformer leur vie grâce à une nutrition appropriée et des changements de mode de vie.
                </p>
              </div>
              <div className="flex justify-center">
                <Image
                  src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?auto=format&fit=crop&q=80&w=1934&ixlib=rb-4.0.3"
                  alt="Portrait de la nutritionniste"
                  width={400}
                  height={400}
                  className="rounded-full border-4 border-green-500"
                />
              </div>
            </div>
          </div>
        </section>
        <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center text-green-700">Nos Services</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-green-50 hover:shadow-md transition-shadow">
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Apple className="h-12 w-12 text-green-600" />
                  <h3 className="text-xl font-bold text-green-700">Plans de repas personnalisés</h3>
                  <p className="text-center text-sm text-green-600">
                    Des plans nutritionnels sur mesure adaptés à vos besoins et objectifs spécifiques.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-green-50 hover:shadow-md transition-shadow">
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Fish className="h-12 w-12 text-green-600" />
                  <h3 className="text-xl font-bold text-green-700">Consultations individuelles</h3>
                  <p className="text-center text-sm text-green-600">
                    Des discussions approfondies pour répondre à vos préoccupations de santé uniques et à vos objectifs.
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
        </section>
        <section id="consultation" className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center text-green-700">Qu'est-ce qu'une consultation diététique ?</h2>
            <Card className="bg-white">
              <CardContent className="p-6">
                <p className="text-green-600 leading-relaxed">
                  La Haute Autorité de Santé définit la consultation diététique comme un ensemble d'actes de soins qui se déroule entre une diététicienne nutritionniste et la personne soignée (accompagnée ou non de son entourage). La consultation diététique est réalisée suite à une prescription médicale ou à la demande directe d'un particulier. Elle comprend : un bilan diététique, la mise en place d'une stratégie, la définition d'objectifs de soin diététique et le suivi nutritionnel à but éducatif, préventif ou thérapeutique. C'est une activité de collaboration avec les médecins et les autres professionnels de santé.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        <section id="avantages" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center text-green-700">Consulter en ligne : les avantages</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-green-50">
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <ThumbsUp className="h-12 w-12 text-green-600" />
                  <h3 className="text-xl font-bold text-green-700">C'est efficace</h3>
                  <p className="text-center text-sm text-green-600">
                    La consultation à distance est identique à celle qui se déroule dans mon cabinet. En visio par Skype, FaceTime, WhatsApp, au téléphone ou par mail, c'est vous qui choisissez.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-green-50">
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Clock className="h-12 w-12 text-green-600" />
                  <h3 className="text-xl font-bold text-green-700">C'est rapide</h3>
                  <p className="text-center text-sm text-green-600">
                    Les enfants, les embouteillages, le travail : ne perdez pas votre temps à vous déplacer. Les nouvelles technologies vont nous rapprocher !
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-green-50">
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Shield className="h-12 w-12 text-green-600" />
                  <h3 className="text-xl font-bold text-green-700">C'est discret</h3>
                  <p className="text-center text-sm text-green-600">
                    Qui a besoin de savoir que vous consultez une diététicienne ? Consulter en ligne vous permet de le faire de chez vous, en toute discrétion et à votre rythme.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-green-50">
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Calendar className="h-12 w-12 text-green-600" />
                  <h3 className="text-xl font-bold text-green-700">C'est pratique</h3>
                  <p className="text-center text-sm text-green-600">
                    Vous choisissez la date et la plage horaire qui vous arrangent le mieux. Je consulte même le samedi.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="temoignages" className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center text-green-700">Témoignages de patients</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar>
                      <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="Sophie M." />
                      <AvatarFallback>SM</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold text-green-700">Sophie M.</h3>
                      <p className="text-sm text-green-600">Cliente depuis 6 mois</p>
                    </div>
                  </div>
                  <p className="text-green-600">
                    "Grâce aux conseils personnalisés, j'ai perdu 10 kg en 4 mois. Je me sens tellement mieux dans ma peau !"
                  </p>
                  <Image
                    src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3"
                    alt="Témoignage de Sophie M."
                    width={300}
                    height={200}
                    className="mt-4 rounded-lg"
                  />
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar>
                      <AvatarImage src="https://i.pravatar.cc/150?img=2" alt="Thomas L." />
                      <AvatarFallback>TL</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold text-green-700">Thomas L.</h3>
                      <p className="text-sm text-green-600">Client depuis 3 mois</p>
                    </div>
                  </div>
                  <p className="text-green-600">
                    "Les consultations en ligne sont super pratiques. J'ai pu améliorer mon alimentation malgré mon emploi du temps chargé."
                  </p>
                  <Image
                    src="https://images.unsplash.com/photo-1532798369041-b33eb576ef16?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3"
                    alt="Témoignage de Thomas L."
                    width={300}
                    height={200}
                    className="mt-4 rounded-lg"
                  />
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar>
                      <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="Marie D." />
                      <AvatarFallback>MD</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold text-green-700">Marie D.</h3>
                      <p className="text-sm text-green-600">Cliente depuis 1 an</p>
                    </div>
                  </div>
                  <p className="text-green-600">
                    "Le suivi quotidien m'a vraiment aidée à rester motivée. J'ai atteint mon objectif et je me sens en pleine forme !"
                  </p>
                  <Image
                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3"
                    alt="Témoignage de Marie D."
                    width={300}
                    height={200}
                    className="mt-4 rounded-lg"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="programmes-sportifs" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
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
        <section id="qualifications" className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center text-green-700">Diplômes et Certifications</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white">
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Award className="h-12 w-12 text-green-600" />
                  <h3 className="text-xl font-bold text-green-700">Diplôme d'État de Diététicien</h3>
                  <p className="text-center text-sm text-green-600">
                    Université de Paris, 2010
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Award className="h-12 w-12 text-green-600" />
                  <h3 className="text-xl font-bold text-green-700">Master en Nutrition Humaine</h3>
                  <p className="text-center text-sm text-green-600">
                    Université de Lyon, 2012
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Award className="h-12 w-12 text-green-600" />
                  <h3 className="text-xl font-bold text-green-700">Certification en Coaching Nutritionnel</h3>
                  <p className="text-center text-sm text-green-600">
                    Institut de Coaching Nutritionnel, 2015
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="tarifs" className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center text-green-700">Tarifs</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-green-50">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-green-700 mb-4">Consultation unique</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-green-600">Première consultation (1h30)</span>
                      <span className="font-bold text-green-700">90€</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-green-600">Consultation de suivi (1h)</span>
                      <span className="font-bold text-green-700">60€</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-green-50">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-green-700 mb-4">Forfait suivi intensif</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-green-600">Consultation initiale + suivi quotidien (1 mois)</span>
                      <span className="font-bold text-green-700">250€</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-green-600">Consultation initiale + suivi quotidien (3 mois)</span>
                      <span className="font-bold text-green-700">600€</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="reservation-contact" className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
      <div className="container px-4 md:px-6">
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
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white" type="submit">
                Réserver ma consultation
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
        <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4" role="alert">
          <p className="font-bold">IMPORTANT</p>
          <p>Après votre réservation, vous recevrez un e-mail de confirmation avec les premières étapes à suivre. Lisez-le attentivement !</p>
        </div>
      </div>
    </section>
      </main>
      <footer className="w-full py-6 bg-green-50 shadow-md mt-12">
        <div className="container flex flex-col gap-2 sm:flex-row items-center px-4 md:px-6">
          <p className="text-xs text-green-600">© 2024 NutriVie. Tous droits réservés.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <a className="text-xs hover:underline underline-offset-4 text-green-600 hover:text-green-700" href="#">
              Conditions d'utilisation
            </a>
            <a className="text-xs hover:underline underline-offset-4 text-green-600 hover:text-green-700" href="#">
              Politique de confidentialité
            </a>
          </nav>
        </div>
      </footer>
    </div>
  )
}