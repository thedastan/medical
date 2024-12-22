import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const language = localStorage.getItem("language");

let lang = language || "de";

i18n.use(initReactI18next).init({
  fallbackLng: "de",
  lng: lang,
  interpolation: { escapeValue: false },
  resources: {
    en: {
      translation: {
        //all termin
        add: "Add",
        login: "Login",
        addMore: "Add more",
        contact: "Contact",
        done: "DONE",
        upload: "Upload",
        document: "Files",
        deleteProfile: "Delete profile",
        editProfile: "Edit profile",
        emergency: "EMERGENCY",
        medicall: "MEDICAL RECORDS",
        patientRecord: "PATIENT RECORD",
        profile: "Profile",
        photo: "Images",
        medicalRecord: "MEDICAL RECORD",
        signOut: "Sign out",
        changePassword: "Change password",
        create: "Create",
        cropAvatar: "Edit Profile Picture",
        saveAvatar: "Save Profile Picture",
        fileUpload: "File is uploading...",
        CREATENew: "CREATE NEW PASSWORD",
        yourPersonal:"",
        //save-contact
        saveContact: "Save our contacts",

        //success-m
        updateAvatar: "Avatar updated successfully",
        selectedFile: "Selected file deleted successfully",

        //error-m
        wrongEmail: "you entered the wrong email",
        filedToSend: "Failed to send data, please try again",
        emailNotForForgotPassword: "Email not for forgot password",
        thereIsNoSuch: "There is no such thing active account",

        //notfall
        allergies: "ALLERGIES",
        dateOfBrith: "DATE OF BIRTH",
        emergencyContact: "EMERGENCY CONTACT",
        firstName: "FIRST NAME",
        lastName: "LAST NAME",
        importTantInfo: "IMPORTANT INFORMATION / OR MEDICATIONS",

        //akte
        diagnosen: "DIAGNOSIS",
        operationen: "OPERATIONS",
        medicamentPlan: "MEDICATION PLAN",
        nebenDiagnosen: "OCCUPATION",
        location: "ADDRESS",

        //guest
        guestLogin: "Guest Login",
        yourName: "Your name",
        enterEmail: "Enter email",
        desc: "Enter the password we sent to your email adress ",
        next: "Next",
        register: "Register",
        fileAnAll: "Fill in all fields, they are both required",
        thisIsCode: "This code is wrong",

        //popup-messengers
        wellDone: "Well Done",
        descWellDone: "New password created successfully",
        sayHello: "Say Hello to your Personal HealthCard ",
        uploadTitle: "File Successfully Uploaded",
        yourRegistration: "Your Registration was successful ",
        resetYourPasword: "Reset Your Password",
        deleteFile:"Delete file",
        descReset:
          "Password reset link sent to your registered email address. Please check your inbox or spam folder",
        fileABig: "The file is too big",

        //registration
        checkTheUserName: "Mistake!!! Check the username or that password",
        clickIfYouDontRememberYourPassword:
          "Click if you don’t remember your password",
        welcome: "Welcome back",
        welcomeToYour: "Welcome to your medicalswitzerland HealthCard",
        wrongEmailAdress: "Wrong email address",
        letsStartWith: "Let's start with your registration",
        requiredFields: "Required fields",
        passwordDoesNot: "Password does not match",
        fieldPasswordRequired: "Field password required",
        passwordsMustMatch: "passwords must match",
        takenEmail: "* The e-mail address you entered is already taken",
        no: "NO",
        yes: "YES",
        SuccessDelete: "Your profile has been  deleted",
        deleteProfileConfirm:
          "Do you want to delete your medicalswitzerland Profile",
        deleteSuccessFile:"Your profile has been successfully deleted",
        delete:"Delete",
      },
    },
    de: {
      translation: {
        delete:"Löschen",
        deleteProfileConfirm:
          "Möchten Sie Ihr medicalswitzerland Profil löschen",

        SuccessDelete: "Ihr Profil und alle dazugehörigen Daten und Bilder wurden gelöscht.",
        deleteFile:"Datei löschen",
        deleteSuccessFile:"Ihr Profil wurde erfolgreich gelöscht",

        //all termin
        add: "Hinzufügen",
        login: "ANMELDUNG",
        addMore: "Mehr hinzufügen",
        contact: "Kontakt",
        upload: "Hochladen",
        done: "Speichern",
        document: "Berichte",
        deleteProfile: "Profil löschen",
        editProfile: "Bearbeiten",
        emergency: "Notfall",
        medicall: "Akte",
        patientRecord: "PATIENTENAKTE",
        profile: "Profil",
        photo: "Bilder ",
        medicalRecord: "PATIENTENAKTE",
        signOut: "Ausloggen",
        changePassword: "Kennwort ändern",
        create: "Erstellen",
        cropAvatar: "Profilbild bearbeiten",
        saveAvatar: "Profilbild speichern",
        fileUpload: "Datei wird hochgeladen...",
        CREATENew: "NEUES PASSWORT FESTLEGEN",
        //save-contact
        saveContact: "Kontakt speichern",
        no: "Nein",
        yes: "Ja",
        //success-m
        updateAvatar: "Profilbild erfolgreich aktualisiert",
        selectedFile: "Ausgewählte Datei erfolgreich gelöscht",

        //errors-m
        wrongEmail: "Sie haben die falsche E-Mail-Adresse eingegeben",
        filedToSend:
          "Daten konnten nicht gesendet werden, bitte versuchen Sie es erneut",
        emailNotForForgotPassword: "E-Mail nicht für vergessenes Passwort",
        thereIsNoSuch: "Es gibt kein aktives Konto",

        //notfall
        allergies: "ALLERGIE",
        dateOfBrith: "GEBURTSDATUM",
        emergencyContact: "NOTFALLKONTAKT",
        firstName: "VORNAME",
        lastName: "NACHNAME",
        importTantInfo: "BESONDERHEITEN",

        //akte
        diagnosen: "DIAGNOSEN",
        operationen: "OPERATIONEN",
        medicamentPlan: "MEDIKAMENTEN PLAN",
        nebenDiagnosen: "BERUF",
        location: "ADRESSE",

        //guest
        guestLogin: "Gast-Login",
        yourName: "Ihren Namen",
        enterEmail: "Email eingeben",
        desc: "Geben Sie das Passwort ein, das wir an Ihre E-Mail-Adresse gesendet haben",
        next: "nächste",
        register: "Registrieren",
        fileAnAll: "Füllen Sie alle Felder aus, beide sind Pflichtfelder",
        thisIsCode: "Dieser Code ist falsch",

        //popup-m
        wellDone: "Gut gemacht",
        descWellDone: "Neues Passwort erfolgreich erstellt",
        sayHello: "Begrüßen Sie Ihre Persönliche GesundheitsCard",
        uploadTitle: "Datei erfolgreich hochgeladen",
        yourRegistration: "Your Registration was successful ",
        resetYourPasword: "Ihre Anfrage war erfolgreich",
        descReset:
          "Link zum Zurücksetzen des Passworts an Ihre registrierte E-Mail-Adresse gesendet. Bitte überprüfen Sie Ihren Posteingang oder Spam-Ordner",

        //registration
        checkTheUserName:"Überprüfen Sie den Benutzernamen und geben Sie das korrekte Passwort ein.",
        clickIfYouDontRememberYourPassword:
          "Klicken Sie, wenn Sie sich nicht an Ihr Passwort erinnern",
        welcome: "Willkommen zurück",
        welcomeToYour: "Willkommen auf Ihrer medicalswitzerland HealthCard",
        wrongEmailAdress: "falsche E-Mail Adresse",
        letsStartWith: "Beginnen wir mit der Registrierung",
        requiredFields: "Benötigte Felder",
        passwordDoesNot: "Passwort stimmt nicht überein",
        fieldPasswordRequired: "Feldpasswort erforderlich",
        passwordsMustMatch: "Die Passwörter müssen übereinstimmen",
        takenEmail: "* Die eingegebene e mail Adresse ist bereits vergeben.",
        fileABig: "Die Datei ist zu groß",
      },
    },
  },
});

export default i18n;
