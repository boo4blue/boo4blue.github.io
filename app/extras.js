/* Haven FW extras: added guides + hotlines (general info; confirm details by phone) */
"use strict";
(function () {
  if (typeof HOTLINES !== "undefined") {
    HOTLINES.push(
      { name: "Veterans Crisis Line", desc: "24/7 for veterans — call 988 then press 1", href: "tel:+18002738255", icon: "🎖️", crisis: true },
      { name: "Homeless Veterans Hotline", desc: "VA help with housing and services for veterans", href: "tel:+18774243838", icon: "🏠" },
      { name: "Indiana Quitline", desc: "Free coaching to quit smoking or vaping — often free patches or gum", href: "tel:+18007848669", icon: "🌬️" },
      { name: "National DV Hotline", desc: "24/7 safe, confidential help leaving an abusive situation", href: "tel:+18007997233", icon: "🛡️", crisis: true },
      { name: "Indiana DCS Hotline", desc: "Report child abuse or neglect, 24/7", href: "tel:+18008005556", icon: "🧒" },
      { name: "Adult Protective Services (IN)", desc: "Report abuse or neglect of an adult who can't protect themselves", href: "tel:+18009926978", icon: "🧓" }
    );
  }
  if (typeof GUIDES === "undefined") return;
  GUIDES.push(
    { id: "lost-id", title: "Replacing Lost ID & Papers", icon: "🪪",
      intro: "No ID makes everything harder. Here is the usual order to get your papers back.",
      where: "Inasmuch Ministry — help with ID and birth certificates", whereId: "inasmuch-ministry",
      bring: ["Any ID or paper you still have, even expired", "A letter from a shelter or mission saying you stay there, if you can get one"],
      steps: [
        "Start with your birth certificate. Order it from the Indiana Department of Health or the health department where you were born. There is a fee, so ask Inasmuch Ministry whether they can help pay.",
        "Next, get a replacement Social Security card. It is free at ssa.gov or any Social Security office. There is a limit on replacements per year, so only ask when you need it.",
        "Then get a state ID at the BMV. Ask the BMV what proof of address they take and whether any fee waiver applies to you.",
        "Need a mailing address? Ask your shelter or mission, or ask any post office about General Delivery, where they hold mail for you."
      ],
      tips: "Take a photo of every paper once you have it and keep it safe. Fees and rules change, so call before you go." },
    { id: "rights-police", title: "If Police Tell You to Move", icon: "⚖️",
      intro: "General information, not legal advice. Staying calm keeps you safest.",
      where: "Indiana Legal Help (indianalegalhelp.org) or call 211",
      steps: [
        "Stay calm, keep your hands where they can be seen, and don't run or argue.",
        "Ask: \"Am I free to go?\" If yes, you can leave. If they say you are being detained, ask why.",
        "You can stay silent. You can say \"I don't consent to a search.\" Do not physically resist.",
        "Ask for the officer's name and badge number. Write down what happened, the time, and the place as soon as you can.",
        "If you think something was unfair, call 211 or visit Indiana Legal Help to find free legal aid."
      ],
      tips: "Having your ID and a charged phone helps. Ask a shelter or day center where it is okay to rest during the day." },
    { id: "veterans", title: "Veterans: Where to Start", icon: "🎖️",
      intro: "Veterans have extra help for housing, health care and benefits.",
      where: "Call 211 and ask for the Allen County Veterans Service Office",
      bring: ["DD-214 or any discharge papers if you have them", "Photo ID"],
      steps: [
        "In crisis? Call 988 then press 1, or text 838255.",
        "Need housing? Call the Homeless Veterans Hotline at 1-877-424-3838.",
        "Ask the county Veterans Service Officer to help you file for benefits and get your discharge papers.",
        "Ask any VA clinic about health care and mental health help."
      ],
      tips: "Veterans' phone menus are long. Stay on the line and say \"homeless veteran\" to reach a person faster." },
    { id: "reentry", title: "After Prison or a Record", icon: "🔓",
      intro: "A record does not end your options. Many people get housing, work and a clean record back.",
      where: "Call 211 and ask for reentry help",
      steps: [
        "Ask 211 for local reentry programs. They can help with ID, housing leads, and work.",
        "Look for jobs marked fair-chance in the Jobs tab. Be honest, and say what you've done since.",
        "Ask Indiana Legal Help about expungement. Indiana law lets many people seal an old record after a waiting period.",
        "In the Places tab, use the filters to find shelters and programs that accept people with a record."
      ],
      tips: "Keep copies of every court paper. They are needed for expungement and for some housing applications." },
    { id: "quit-nicotine", title: "Quit Smoking or Vaping (Free)", icon: "🌬️",
      intro: "Free coaching and often free patches or gum.",
      where: "Indiana Quitline: 1-800-QUIT-NOW (1-800-784-8669)",
      steps: [
        "Call 1-800-784-8669. It is free and open every day.",
        "Ask about free nicotine patches or gum. Eligible Hoosiers can often get them by mail.",
        "Tell them if you live in a shelter or have no fixed address."
      ],
      tips: "Cravings are strongest in the first few days. Keep gum or candy in your pocket." },
    { id: "call-script", title: "What to Say When You Call", icon: "☎️",
      intro: "A short script for calling a shelter, pantry or agency.",
      where: "Any shelter, pantry or agency in the Places tab",
      steps: [
        "Say: \"Hi, my name is ___. I need help with ___ (a bed / food / a bus pass).\"",
        "Ask: \"Do you have room tonight?\" or \"When are you open?\"",
        "Ask: \"What do I need to bring? Do I need an ID?\"",
        "Ask: \"Can I bring my pet, my partner or my kids?\"",
        "Write down the name of who you spoke to and the time."
      ],
      tips: "If you're not sure, say so. Staff hear this every day and want to help." },
    { id: "storms", title: "Tornado, Flood & Power Outage", icon: "🌪️",
      intro: "What to do when severe weather hits and you don't have a home to shelter in.",
      where: "Call 211 to find open emergency shelters",
      steps: [
        "Tornado warning: go inside the nearest sturdy building (library, store, church, shelter) and ask staff to let you in. Go to the lowest floor, in a room without windows.",
        "No building nearby? Get as low as you can, away from trees and cars, and cover your head. Don't shelter under an overpass.",
        "Flooding: move to higher ground. Never walk or drive through floodwater.",
        "Power out: look for charging spots in the Places tab and keep your phone on low-power mode.",
        "Call 211 afterward to find shelter, food and supplies."
      ],
      tips: "Turn on phone alerts for your area. Haven also shows a banner when a warning is active." },
    { id: "heat", title: "Staying Cool in Summer", icon: "🥵",
      intro: "Heat can be dangerous. Plan your day around shade, water and air conditioning.",
      where: "Libraries, day centers and water spots on the map",
      steps: [
        "Drink water before you feel thirsty. Use the water category on the map to find refill spots.",
        "Rest in air conditioning during the hottest hours (noon to 5 pm): libraries, day centers, stores.",
        "Wear light clothes and a hat. Wet a shirt or towel to cool your neck.",
        "Warning signs: dizziness, confusion, nausea, hot dry skin or no sweating. Move to cool shade and call 911.",
        "Never stay in a parked car. Check on others who look unwell."
      ],
      tips: "Alcohol and some medicines make heat worse. Drink extra water." },
    { id: "scams", title: "Scams to Watch For", icon: "🚨",
      intro: "People in tough spots are often targeted. These are common signs of a scam.",
      where: "Not sure? Call 211 to check before you pay or share anything",
      steps: [
        "Real benefit offices never ask you to pay to apply for food stamps, housing or Medicaid.",
        "Anyone asking for gift cards, Cash App, Zelle or wire money is a scam.",
        "Never give your Social Security number by text or to an unexpected caller.",
        "Be careful with jobs that charge for training or promise big pay for little work.",
        "Payday and title loans can trap you in debt. Ask a mission about other options first."
      ],
      tips: "If it feels rushed or too good to be true, stop and ask someone you trust." }
  );

  if (typeof GUIDE_ES !== "undefined") Object.assign(GUIDE_ES, {
    "lost-id": { title: "Reemplazar identificación y documentos", intro: "Sin identificación todo es más difícil. Este es el orden usual para recuperar tus papeles.",
      bring: ["Cualquier identificación o papel que aún tengas, aunque esté vencido", "Una carta de un refugio o misión que diga que te quedas allí, si puedes conseguirla"],
      steps: ["Empieza con tu acta de nacimiento. Pídela al Departamento de Salud de Indiana o al departamento de salud del lugar donde naciste. Tiene un costo; pregunta a Inasmuch Ministry si pueden ayudarte a pagarlo.",
        "Luego pide una tarjeta de Seguro Social de reemplazo. Es gratis en ssa.gov o en cualquier oficina del Seguro Social. Hay un límite de reemplazos por año, así que pídela solo cuando la necesites.",
        "Después saca una identificación estatal en el BMV. Pregunta qué comprobante de domicilio aceptan y si hay alguna exención de costo para ti.",
        "¿Necesitas dirección postal? Pregunta en tu refugio o misión, o en cualquier oficina de correos por General Delivery, donde guardan tu correo."],
      tips: "Toma una foto de cada papel cuando lo recuperes y guárdala en un lugar seguro. Los costos y reglas cambian, así que llama antes de ir." },
    "rights-police": { title: "Si la policía te pide que te muevas", intro: "Información general, no es asesoría legal. Mantener la calma es lo más seguro.",
      steps: ["Mantén la calma, deja las manos a la vista y no corras ni discutas.",
        "Pregunta: \"¿Soy libre de irme?\" Si la respuesta es sí, puedes irte. Si dicen que te detienen, pregunta por qué.",
        "Puedes guardar silencio. Puedes decir: \"No doy mi consentimiento para un registro.\" No te resistas físicamente.",
        "Pide el nombre y número de placa del oficial. Anota lo que pasó, la hora y el lugar apenas puedas.",
        "Si crees que algo fue injusto, llama al 211 o visita Indiana Legal Help para encontrar ayuda legal gratuita."],
      tips: "Ayuda tener tu identificación y el teléfono cargado. Pregunta en un refugio o centro de día dónde puedes descansar durante el día." },
    "veterans": { title: "Veteranos: por dónde empezar", intro: "Los veteranos tienen ayuda adicional para vivienda, salud y beneficios.",
      bring: ["DD-214 u otros papeles de baja, si los tienes", "Identificación con foto"],
      steps: ["¿En crisis? Llama al 988 y oprime 1, o envía un texto al 838255.",
        "¿Necesitas vivienda? Llama a la línea para veteranos sin hogar: 1-877-424-3838.",
        "Pide al Oficial de Servicios para Veteranos del condado que te ayude a solicitar beneficios y conseguir tus papeles de baja.",
        "Pregunta en cualquier clínica del VA por atención médica y de salud mental."],
      tips: "Los menús telefónicos para veteranos son largos. Quédate en la línea y di \"homeless veteran\" para hablar con una persona más rápido." },
    "reentry": { title: "Después de la cárcel o con antecedentes", intro: "Tener antecedentes no acaba tus opciones. Muchas personas consiguen vivienda, trabajo y limpiar su récord.",
      steps: ["Pide al 211 programas locales de reinserción. Pueden ayudar con identificación, vivienda y trabajo.",
        "Busca empleos marcados como fair-chance en la pestaña de Trabajos. Sé honesto y cuenta lo que has hecho desde entonces.",
        "Pregunta en Indiana Legal Help por la eliminación de antecedentes (expungement). La ley de Indiana permite sellar muchos récords después de un tiempo de espera.",
        "En la pestaña Lugares, usa los filtros para encontrar refugios y programas que acepten a personas con antecedentes."],
      tips: "Guarda copias de todos los papeles de la corte. Se necesitan para la eliminación de antecedentes y algunas solicitudes de vivienda." },
    "quit-nicotine": { title: "Dejar de fumar o vapear (gratis)", intro: "Asesoría gratuita y, a menudo, parches o chicles de nicotina gratis.",
      steps: ["Llama al 1-800-784-8669. Es gratis y atienden todos los días.",
        "Pregunta por parches o chicles de nicotina gratis. Las personas elegibles de Indiana a menudo los reciben por correo.",
        "Diles si vives en un refugio o no tienes domicilio fijo."],
      tips: "Los antojos son más fuertes en los primeros días. Lleva chicle o caramelos en el bolsillo." },
    "call-script": { title: "Qué decir cuando llamas", intro: "Un guion corto para llamar a un refugio, despensa o agencia.",
      steps: ["Di: \"Hola, me llamo ___. Necesito ayuda con ___ (una cama / comida / un pase de autobús).\"",
        "Pregunta: \"¿Tienen espacio esta noche?\" o \"¿A qué hora abren?\"",
        "Pregunta: \"¿Qué debo llevar? ¿Necesito identificación?\"",
        "Pregunta: \"¿Puedo llevar a mi mascota, mi pareja o mis hijos?\"",
        "Anota el nombre de la persona con quien hablaste y la hora."],
      tips: "Si no estás seguro, dilo. El personal escucha esto todos los días y quiere ayudar." },
    "storms": { title: "Tornado, inundación y apagón", intro: "Qué hacer cuando hay mal tiempo y no tienes una casa donde refugiarte.",
      steps: ["Aviso de tornado: entra al edificio resistente más cercano (biblioteca, tienda, iglesia, refugio) y pide al personal que te deje pasar. Ve al piso más bajo, a un cuarto sin ventanas.",
        "¿No hay edificio cerca? Agáchate lo más que puedas, lejos de árboles y autos, y cúbrete la cabeza. No te refugies bajo un paso elevado.",
        "Inundación: busca terreno más alto. Nunca camines ni manejes por agua de inundación.",
        "Sin electricidad: busca lugares para cargar en la pestaña Lugares y pon el teléfono en modo de ahorro de batería.",
        "Después, llama al 211 para encontrar refugio, comida y suministros."],
      tips: "Activa las alertas del teléfono para tu zona. Haven también muestra un aviso cuando hay una alerta activa." },
    "heat": { title: "Mantenerse fresco en verano", intro: "El calor puede ser peligroso. Planea tu día alrededor de sombra, agua y aire acondicionado.",
      steps: ["Toma agua antes de tener sed. Usa la categoría de agua en el mapa para encontrar dónde rellenar.",
        "Descansa con aire acondicionado en las horas más calurosas (mediodía a 5 pm): bibliotecas, centros de día, tiendas.",
        "Usa ropa ligera y gorra. Moja una camisa o toalla para refrescar el cuello.",
        "Señales de alerta: mareo, confusión, náuseas, piel caliente y seca o sin sudor. Ve a la sombra y llama al 911.",
        "Nunca te quedes en un auto estacionado. Fíjate en otras personas que se vean mal."],
      tips: "El alcohol y algunos medicamentos empeoran el calor. Toma más agua." },
    "scams": { title: "Estafas a las que debes prestar atención", intro: "Las personas en momentos difíciles son blanco frecuente. Estas son señales comunes de estafa.",
      steps: ["Las oficinas de beneficios reales nunca piden que pagues para solicitar cupones de comida, vivienda o Medicaid.",
        "Quien te pida tarjetas de regalo, Cash App, Zelle o transferencias es un estafador.",
        "Nunca des tu número de Seguro Social por texto ni a una llamada inesperada.",
        "Cuidado con empleos que cobran por capacitación o prometen mucho dinero por poco trabajo.",
        "Los préstamos de día de pago y de título pueden atraparte en deudas. Antes pregunta en una misión por otras opciones."],
      tips: "Si te presionan o suena demasiado bueno para ser verdad, detente y pregunta a alguien de confianza." }
  });
})();
