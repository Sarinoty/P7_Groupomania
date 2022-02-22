export const dateParser = (num) => {
    let options = {
      hour: "2-digit",
      minute: "2-digit",
      /* second: "2-digit", */
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
  
    //let timestamp = Date.parse(num);
  
    let date = new Date(num).toLocaleDateString("fr-FR", options);
  //console.log(date)
    return date.toString();
  };

  export const spaceBetween = (num1, num2) => {
    const delta = {};
    const deltaSecs = (num2-num1)/1000;
    delta.minutes = deltaSecs / 60;
    delta.heures = deltaSecs / 3600;
    delta.jours = deltaSecs / 86400;
    delta.mois = deltaSecs / 2592000;
    delta.ans = deltaSecs / 946080000;

    if(delta.ans >= 2) return Math.floor(delta.ans) + ' ans';
    if(delta.ans >= 1 && delta.ans < 2) return Math.floor(delta.ans) + ' an';
    if(delta.mois >= 1) return Math.floor(delta.mois) + ' mois';
    if(delta.jours >= 2) return Math.floor(delta.jours) + ' jours';
    if(delta.jours >= 1 && delta.jours < 2) return Math.floor(delta.jours) + ' jour';
    if(delta.heures >= 2) return Math.floor(delta.heures) + ' heures';
    if(delta.heures >= 1 && delta.heures < 2) return Math.floor(delta.heures) + ' heure';
    if(delta.minutes >= 2) return Math.floor(delta.minutes) + ' minutes';
    if(delta.minutes >= 1 && delta.minutes < 2) return Math.floor(delta.ans) + ' minute';
    if(delta.minutes < 1 && deltaSecs > 1) return Math.floor(deltaSecs) + ' secondes';
    else return Math.floor(deltaSecs) + ' seconde';
  }