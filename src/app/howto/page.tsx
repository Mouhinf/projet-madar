import AppHeader from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function HowToPage() {
  // Note: These video URLs are placeholders.
  // Replace them with the actual URLs of your videos.
  const videoUrlFrench = "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4";
  const videoUrlWolof = "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader showSearch={false} />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4">
            <Button asChild variant="ghost" className="mb-4">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Retour à la boutique
                </Link>
            </Button>

          <Card>
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">
                Comment passer une commande ?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="text-center text-muted-foreground">
                <p>
                  Suivez les étapes ci-dessous ou regardez nos vidéos tutorielles pour passer votre commande en toute simplicité.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Tutoriel Vidéo (Français)</h3>
                    <div className="aspect-video w-full overflow-hidden rounded-lg border">
                         <video src={videoUrlFrench} controls className="w-full h-full object-cover">
                            Votre navigateur ne supporte pas la lecture de vidéos.
                        </video>
                    </div>
                </div>
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Tutoriel Vidéo (Wolof)</h3>
                    <div className="aspect-video w-full overflow-hidden rounded-lg border">
                         <video src={videoUrlWolof} controls className="w-full h-full object-cover">
                           Votre navigateur ne supporte pas la lecture de vidéos.
                        </video>
                    </div>
                </div>
              </div>

              <div className="prose max-w-none text-muted-foreground">
                <h3 className="font-semibold text-lg text-foreground">Instructions écrites :</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li><strong>Parcourir les produits :</strong> Naviguez à travers nos catégories ou utilisez la barre de recherche pour trouver les produits dont vous avez besoin.</li>
                  <li><strong>Ajouter au panier :</strong> Pour chaque produit, choisissez le conditionnement (taille) et cliquez sur l'icône "plus" pour l'ajouter à votre panier.</li>
                  <li><strong>Consulter le panier :</strong> Cliquez sur l'icône du panier en haut à droite pour voir les articles que vous avez sélectionnés. Vous pouvez y modifier les quantités ou supprimer des articles.</li>
                  <li><strong>Informations de livraison :</strong> Remplissez vos informations : nom, numéro de téléphone et adresse de livraison. Vous pouvez utiliser le bouton "Me localiser" pour plus de précision.</li>
                  <li><strong>Résumé de la commande :</strong> Cliquez sur "Obtenir le résumé de la commande" pour qu'une intelligence artificielle vérifie et confirme le total de votre commande.</li>
                  <li><strong>Valider la commande :</strong> Une fois le résumé confirmé, cliquez sur "Valider la commande". Notre équipe vous contactera sous peu pour finaliser la livraison.</li>
                </ol>
              </div>

            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
