const passwordValidator = require('password-validator');

const passSchema = new passwordValidator();

passSchema                                                             // Le mot de passe, pour être considéré comme valide, doit :
    .is().min(7)                                                       // - avoir au moins 7 caractères
    .is().max(20)                                                      // - avoir maximum 20 caractères
    .has().uppercase()                                                 // - contenir au moins une majuscule
    .has().lowercase()                                                 // - contenir au moins une minuscule
    .has().digits(1)                                                   // - contenir au moins un chiffre
    .has().not().spaces()                                              // - ne pas contenir d'espace
    .is().not().oneOf(['Passw0rd123', 'M0tdepasse123', 'M0t2Pass']);   // - ne pas être un des mots de passe listés

module.exports = ("PassCheck", passSchema);