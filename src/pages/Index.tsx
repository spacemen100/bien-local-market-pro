import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Calendar, Users, CheckCircle } from 'lucide-react';

const Index = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Gestion d'États des Lieux
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Simplifiez la gestion de vos états des lieux d'entrée et de sortie avec notre plateforme professionnelle.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild>
            <a href="/app">
              Commencer
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="/demo">
              Voir la démo
            </a>
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              États des lieux complets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Créez des états des lieux détaillés avec photos et descriptions pour chaque élément du logement.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              Gestion des rendez-vous
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Planifiez et suivez vos rendez-vous d'états des lieux avec un calendrier intégré.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              Collaboration d'équipe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Travaillez en équipe et partagez vos états des lieux avec vos collaborateurs.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Pourquoi choisir notre solution ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "Interface intuitive et facile à utiliser",
            "Stockage sécurisé dans le cloud",
            "Exports PDF professionnels",
            "Support client réactif",
            "Mise à jour automatique",
            "Conformité RGPD"
          ].map((benefit, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;