/* === guides-es.js === */
/* Haven FW — Spanish translations of the benefit guides.
   Keys mirror data.js GUIDES ids; fields translated: title, intro, bring, steps, tips.
   Proper nouns (place names, addresses, phones, program names like SNAP/WIC/EBT) stay in English. */
const GUIDE_ES = {
  "snap": {
    title: "SNAP / EBT (Cupones de comida)",
    intro: "Dinero mensual en una tarjeta EBT para comprar comida. Si tus ingresos son bajos, probablemente calificas.",
    bring: [
      "Identificación con foto (trae la que tengas — ellos te ayudan)",
      "Prueba de ingresos — recibos de pago o una carta de tu empleador",
      "Prueba de domicilio — contrato de renta, correo o una carta de un refugio",
      "Números de Seguro Social de todos en tu hogar",
      "Recibos de servicios (luz, agua), si los pagas",
    ],
    steps: [
      "Aplica en línea en fssabenefits.in.gov, o ve en persona a la oficina de DFR",
      "Haz la entrevista — un trabajador social te llama o te atiende para verificar tu información",
      "Recibes una decisión, usualmente en 30 días (más rápido si estás en crisis)",
      "Tu tarjeta EBT llega por correo — úsala en casi todas las tiendas de comida",
    ],
    tips: "¿No tienes ningún ingreso? Dilo en la solicitud — aún puedes calificar. Reporta cambios de ingreso o domicilio para que no te corten los beneficios.",
  },
  "medicaid": {
    title: "Medicaid (HIP y Hoosier Healthwise)",
    intro: "Seguro de salud gratis o casi gratis del estado de Indiana.",
    bring: [
      "Identificación con foto",
      "Prueba de ingresos",
      "Prueba de domicilio en Indiana",
      "Números de Seguro Social de tu hogar",
      "Documentos de inmigración, si no eres ciudadano estadounidense",
    ],
    steps: [
      "HIP cubre a adultos de 19 a 64 años con bajos ingresos (un adulto soltero hasta unos $22,000 al año en 2026)",
      "Hoosier Healthwise cubre a niños, mujeres embarazadas y familias",
      "Aplica en la oficina de DFR, por teléfono o en línea — luego elige un plan (Anthem, CareSource o MHS)",
      "Muestra tu tarjeta en clínicas gratuitas como Matthew 25 o Neighborhood Health",
    ],
    tips: "¿Ya tienes Medicaid? Mantén tu domicilio actualizado con DFR o puedes perder tu cobertura al renovar.",
  },
  "medicare": {
    title: "Medicare",
    intro: "Seguro de salud federal si tienes 65 años o más, o una discapacidad que califica.",
    bring: [
      "Identificación con foto y acta de nacimiento",
      "Prueba de ciudadanía estadounidense o residencia legal",
      "Información de tu historial de trabajo, si aplicas por discapacidad",
    ],
    steps: [
      "Aplica en línea en ssa.gov, por teléfono al 1-800-772-1213, o en persona",
      "¿Cumples 65? Puedes inscribirte desde 3 meses antes de tu mes de cumpleaños",
      "¿Por discapacidad? Medicare usualmente empieza después de 24 meses de pagos de SSDI",
      "Pregunta en la oficina sobre cobertura de medicamentos (Parte D) y programas que pagan tus primas si andas corto de dinero",
    ],
    tips: "¿Bajos ingresos? Pregunta por los Programas de Ahorro de Medicare — pueden pagar tus primas y más.",
  },
  "wic": {
    title: "WIC (Mamás y niños pequeños)",
    intro: "Comida saludable gratis, ayuda de nutrición y apoyo para amamantar.",
    bring: [
      "Identificación tuya y de cada niño que inscribas",
      "Prueba de tu domicilio actual",
      "Prueba de ingresos — un recibo de pago o carta de beneficios",
    ],
    steps: [
      "Llama antes para una cita de certificación — las visitas sin cita son limitadas",
      "Lleva a todos los que inscribas a la primera visita",
      "Recibe tu tarjeta WIC cargada con beneficios mensuales de comida",
      "Usa la app de WIC para ver tu saldo y escanear compras en la tienda",
    ],
    tips: "¿Embarazada, en posparto, amamantando o con niños menores de 5? Si andas corta de dinero, aplica — WIC es aparte de SNAP y puedes tener ambos.",
  },
  "ssi": {
    title: "SSI y Discapacidad (SSDI)",
    intro: "Cheques mensuales si una discapacidad te impide trabajar.",
    bring: [
      "Identificación con foto y tarjeta de Seguro Social",
      "Historiales médicos — nombres de doctores, hospitales, fechas de tratamiento",
      "Historial de trabajo de aproximadamente los últimos 15 años",
      "Información de cuenta bancaria para depósito directo",
    ],
    steps: [
      "Aplica en línea en ssa.gov, por teléfono o en persona — SSI es por necesidad, SSDI es por historial de trabajo",
      "La mayoría de las primeras solicitudes son negadas — apela dentro de 60 días y no te rindas",
      "Recibe ayuda gratis con apelaciones de Indiana Legal Services: (260) 424-9155",
      "Mientras esperas, pregunta en la oficina de DFR sobre otra ayuda que puedas recibir",
    ],
    tips: "Guarda copias de todo lo que entregues y anota la fecha de cada cita y llamada.",
  },
  "legal": {
    title: "Ayuda legal gratis",
    intro: "Abogados de verdad que trabajan gratis cuando tienes bajos ingresos.",
    bring: [
      "Identificación con foto",
      "Cualquier papel sobre tu problema — aviso de desalojo, cartas de negación, fechas de corte",
      "Prueba de ingresos",
    ],
    steps: [
      "Llama al (260) 424-9155 — el registro es mar–jue en la mañana, 8:30–11:30",
      "O aplica en línea en indianalegalservices.org (toma unos 20 minutos)",
      "Atienden vivienda, negaciones de beneficios, deudas de consumo, limpieza de récord y casos de violencia doméstica",
      "Sin casos criminales — pero pídeles una referencia si ese es tu caso",
    ],
    tips: "¿Recibiste un aviso de desalojo? Llama de inmediato — los plazos para responder son cortos.",
  },
  "bus": {
    title: "Moverse gratis",
    intro: "Cómo viajar en Citilink sin pagar tarifa completa.",
    bring: [
      "Identificación, si tienes",
      "Algo que muestre bajos ingresos o una discapacidad (para tarifas reducidas)",
    ],
    steps: [
      "Pregunta en tu refugio, con tu trabajador social o en una iglesia — muchos reparten pases de Citilink GRATIS a sus clientes",
      "Llama al 211 y pregunta por ayuda de transporte",
      "Citilink vende pases de tarifa reducida para adultos mayores y pasajeros con discapacidades",
      "Planea tus viajes con los mapas de rutas en Central Station — los buses corren lun–sáb, sin domingos",
    ],
    tips: "Un pase mensual cuesta unos $45 — si viajas todos los días, se paga solo en dos semanas.",
  },
  "meds": {
    title: "Medicamentos gratis",
    intro: "Formas reales de surtir tus recetas en Fort Wayne cuando no puedes pagar.",
    bring: [
      "Identificación con foto",
      "Tus frascos de pastillas actuales o una lista de lo que tomas",
      "Prueba de no tener seguro o de bajos ingresos (un recibo de pago o carta de beneficios)",
    ],
    steps: [
      "Hazte paciente de Matthew 25 — dan medicamentos a sus pacientes sin costo",
      "Siempre pide al doctor la versión genérica — cuesta una fracción de la de marca",
      "Muestra un cupón gratis de GoodRx en cualquier farmacia para bajar el precio, sin necesidad de seguro",
      "Pregunta a tu farmacéutico sobre programas de ayuda de los fabricantes (RxAssist, NeedyMeds) — muchos dan medicamentos de marca gratis si tus ingresos son bajos",
      "Llama al 211 y pregunta por programas de ayuda con recetas",
    ],
    tips: "Nunca dejes de tomar dosis para estirar tus pastillas — díselo primero a la clínica. Muchas veces pueden cambiarte a algo más barato o gratis.",
  },
  "therapy": {
    title: "Terapia gratis y de bajo costo",
    intro: "Consejería y ayuda de salud mental en Fort Wayne, aun sin dinero ni seguro.",
    bring: [
      "Identificación con foto",
      "Prueba de ingresos, si tienes (para la escala de pago)",
      "Una lista de los medicamentos que tomas",
    ],
    steps: [
      "Llama a Park Center al (260) 481-2700 y pide el registro — las cuotas se ajustan a tus ingresos",
      "¿Sin seguro? Dilo — aceptan Medicaid y pacientes sin seguro",
      "Pregunta por terapia de grupo y grupos de apoyo — muchas veces son gratis",
      "Llama al 211 por otras opciones de consejería gratis, incluyendo las de iglesias",
    ],
    tips: "En crisis, llama o envía un texto al 988 a cualquier hora — es gratis, 24/7, y no necesitas seguro ni cita.",
  },
  "bus-passes": {
    title: "Pases de bus gratis",
    intro: "Dónde conseguir de verdad pases gratis de Citilink.",
    bring: [
      "Identificación, si tienes",
      "Algo que muestre por qué los necesitas — una carta del refugio, nota de un trabajador social o información de una entrevista de trabajo",
    ],
    steps: [
      "Pregunta primero en tu refugio, con tu trabajador social o en una iglesia — muchos reparten pases de Citilink GRATIS a sus clientes",
      "Llama al 211 y pregunta por ayuda de transporte y programas de pases de bus",
      "Pregunta a tu consejero de WorkOne por pases para entrevistas mientras buscas trabajo",
      "Si eres adulto mayor o tienes una discapacidad, solicita el pase de tarifa reducida de Citilink en Central Station",
      "Recoge un mapa de rutas en papel en Central Station para saber qué bus tomar",
    ],
    tips: "Sé específico sobre para qué necesitas los viajes — trabajo, citas médicas, entrevistas. Los programas priorizan viajes con un propósito.",
  },
  "gift-cards": {
    title: "Tarjetas de regalo de comida gratis",
    intro: "No hay un programa del gobierno para esto — pero iglesias y organizaciones sí reparten tarjetas de regalo de tiendas y comida rápida. Aquí te decimos dónde preguntar.",
    bring: [
      "Identificación con foto",
      "Prueba de domicilio (un recibo, contrato de renta o carta del refugio)",
      "Prepárate para explicar tu situación — hijos, sin cocina, sin transporte",
    ],
    steps: [
      "Llama al 211 y pregunta específicamente por ayuda con tarjetas de regalo o de tiendas",
      "Pregunta en oficinas de iglesias — las conferencias parroquiales de St. Vincent de Paul y los fondos de benevolencia de las iglesias son la fuente clásica",
      "Pregunta en el Salvation Army y Just Neighbors por ayuda de emergencia con comida — a veces dan tarjetas caso por caso",
      "Pregunta en los bancos de comida si alguna vez reparten tarjetas de tiendas, especialmente en días festivos",
      "Si estás en un refugio, pregunta al personal — muchos guardan algunas tarjetas de emergencia",
    ],
    tips: "La mayoría de las tarjetas son para tiendas de comida, no comida rápida — y usualmente es una por hogar, no algo regular. Sé amable, sé honesto y no preguntes dos veces seguidas en el mismo lugar.",
  },
  "addiction": {
    title: "Ayuda para la adicción",
    intro: "Ayuda con problemas de alcohol o drogas en Fort Wayne — desintoxicación, rehabilitación y grupos de apoyo gratis. Pedir ayuda es lo difícil; lo demás es solo presentarse.",
    bring: [
      "Identificación con foto, si tienes",
      "Tarjeta de seguro o información de Medicaid, si tienes (¿sin seguro? la mayoría de los lugares te aceptan igual)",
      "Una lista de los medicamentos que tomas",
      "Una bolsa con lo básico si quizás te quedas a dormir (desintoxicación/rehabilitación)",
    ],
    steps: [
      "Llama a la Línea Nacional de Ayuda de SAMHSA al 1-800-662-4357 — gratis, confidencial, 24/7, y te conectan con un programa local",
      "¿Necesitas desintoxicación ahora? Parkview Behavioral Health (260-373-7500) recibe sin cita 24/7 y acepta Medicaid",
      "¿Quieres rehabilitación residencial? Fort Wayne Recovery (833-762-3739) hace registros 24/7 y también ayuda con vivienda y trabajo",
      "¿Usas opioides? BHG Fort Wayne (260-420-6010) ofrece tratamiento ambulatorio con metadona/Suboxone, en las mañanas entre semana",
      "Mujeres saliendo de la cárcel o de tratamiento corto: Redemption House (260-745-1005) ofrece un hogar de 6 meses basado en la fe",
      "Para apoyo gratis continuo, entra a una reunión de AA (260-471-6262) o NA (260-427-9113) — sin registro, sin costo",
    ],
    tips: "No tienes que estar “lista” ni haber tocado fondo — llama mientras lo estás pensando. Si usas drogas y temes una sobredosis, la Ley Lifeline de Indiana protege a quienes llaman al 911 por ayuda.",
  },
  "freephone": {
    title: "Conseguir un teléfono gratis (Lifeline)",
    intro: "El programa federal Lifeline da a hogares de bajos ingresos un descuento de $9.25 al mes en servicio de teléfono o internet — y varios proveedores en Indiana incluyen un teléfono inteligente básico gratis.",
    bring: [
      "Prueba de que calificas — una carta de beneficios (SNAP, Medicaid, SSI, etc.) o prueba de que tus ingresos están al o bajo el 135% de la línea de pobreza",
      "Prueba de domicilio",
      "Prueba de identidad (identificación con foto)",
    ],
    steps: [
      "Verifica que califiques: SNAP, Medicaid, SSI, vivienda pública, pensión de veteranos — o ingresos al o bajo el 135% de la línea federal de pobreza. Un beneficio por hogar.",
      "Aplica a través del Verificador Nacional de la FCC en nv.fcc.gov (o checklifeline.usac.org) — este es el paso oficial de aprobación del gobierno",
      "Elige un proveedor de Lifeline en Indiana: Assurance Wireless (teléfono + plan gratis en T-Mobile, 1-888-321-5880), SafeLink Wireless (teléfono gratis o SIM gratis, 1-800-378-1684) o enTouch Wireless (SIM gratis para tu propio teléfono, 1-866-488-8719)",
      "Inscríbete con el proveedor que elegiste — activan tu teléfono gratis o te lo envían",
      "Renueva una vez al año para mantener el beneficio",
    ],
    tips: "El antiguo Programa de Conectividad Asequible (ACP) TERMINÓ en junio de 2024 — si alguien intenta inscribirte en ACP, es una estafa o información vieja. Lifeline es el programa activo ahora.",
  },
  "freedata": {
    title: "Internet y WiFi gratis",
    intro: "Puntos de WiFi gratis por todo Fort Wayne — bibliotecas, cafés y lugares de comida rápida — además de un descuento gratis de datos si calificas.",
    steps: [
      "El mejor internet gratis en el centro: la biblioteca principal Allen County Public Library, 900 Library Plz (abierta lun–jue 9–9, vie–sáb 9–6, dom 12–5) — WiFi gratis, asientos, enchufes",
      "Lado noroeste: sucursal ACPL Little Turtle, 2201 Sherman Blvd (lun–mié 10–9, jue–sáb 10–6)",
      "Horario nocturno: McDonald's en 255 E Coliseum Blvd (drive-thru 24 horas) o 1103 Goshen Rd — WiFi gratis, bueno cuando la biblioteca está cerrada",
      "Asientos cómodos, abre temprano: Starbucks en 301 E Coliseum Blvd (todos los días 4:30 AM–9:30 PM) o 5723 Coventry Ln (lado suroeste)",
      "¿Necesitas datos en tu propio teléfono? El programa Lifeline de arriba incluye datos mensuales de alta velocidad con los planes gratis de la mayoría de los proveedores — mira la guía de teléfono gratis",
      "No necesitas tarjeta de la biblioteca solo para usar el WiFi — siéntate, conéctate y entra en línea",
    ],
    tips: "El WiFi público sirve para navegar y solicitar empleos, pero evita entrar a cuentas de banco en él. Las bibliotecas también tienen computadoras e impresoras gratis si no tienes dispositivo.",
  },
  "lgbtq": {
    title: "Apoyo LGBTQ+ en Fort Wayne",
    intro: "Lugares de apoyo en Fort Wayne donde puedes ser quien eres — comunidad, salud, ayuda legal y líneas de crisis que te entienden.",
    steps: [
      "¿Necesitas comunidad? Fort Wayne Pride Center (527 W Berry St) tiene grupos de apoyo mensuales y eventos sociales — revisa fwpride.org para el calendario. ¿Eres trans o no binario y tienes 18+? Evolution X se reúne el 4to martes, 7–9 PM.",
      "¿Necesitas salud que te respete? Planned Parenthood Fort Wayne (2930 Lake Ave, 1-800-769-0045) ofrece terapia hormonal de afirmación de género con consentimiento informado — sin carta de terapeuta — además de pruebas de ITS a escala móvil.",
      "¿Necesitas pruebas gratis de VIH/ITS? Positive Resource Connection (525 Oxford St, 260-744-1144) hace pruebas confidenciales gratis sin cita, además de PrEP para personas sin seguro.",
      "¿Necesitas ayuda legal? El Proyecto LGBTQ+ de Indiana Legal Services (110 W Berry St, 260-424-9155) hace cambios gratis de nombre y marcador de género, pelea la discriminación y ayuda con cobertura de seguro para cuidado de afirmación de género.",
      "¿Eres joven y necesitas hablar con alguien? The Center for Nonviolence (260-456-4112) tiene un grupo juvenil LGBTQ+, y el Trevor Project (1-866-488-7386) está ahí 24/7.",
    ],
    tips: "No tienes que explicar ni justificar quién eres para recibir ayuda en ninguno de estos lugares — para eso existen.",
  },
  "freefood": {
    title: "Comida gratis en Fort Wayne",
    intro: "Tres formas de comer gratis en Fort Wayne: bancos de comida para despensa, comidas calientes servidas a diario y almuerzos para llevar.",
    steps: [
      "¿Necesitas despensa? Community Harvest Food Bank y despensas de barrio como Miss Virginia's reparten comida gratis — trae una bolsa y revisa sus horarios antes de ir.",
      "¿Necesitas una comida caliente hoy? St. Mary's Soup Kitchen sirve comidas calientes gratis — toca su tarjeta para dirección, horarios e indicaciones.",
      "¿Necesitas un almuerzo para llevar? The Franciscan Center (4643 Gaywood Dr) reparte más de 1,200 almuerzos gratis cada sábado — solo preséntate, sin cita ni identificación.",
      "¿Tienes prisa? Busca “bag lunch” en la pestaña Lugares para encontrar puntos de almuerzos cerca de ti.",
    ],
    tips: "La mayoría de los lugares de comida son por orden de llegada — ir temprano en el día usualmente significa mejor selección. Los horarios pueden cambiar, así que llamar antes nunca está de más.",
  },
  "safehaven": {
    title: "Safe Haven para recién nacidos",
    intro: "Si no puedes cuidar a un recién nacido, la ley de Indiana te permite entregarlo de forma segura, anónima y legal.",
    steps: [
      "Llama a la Línea Directa de Safe Haven 24/7 al 1-866-99BABY1 (1-866-992-2291) — consejeros licenciados, totalmente confidencial, pueden ayudar con la entrega o con recursos para quedarte con tu bebé",
      "La ley Safe Haven de Indiana cubre bebés de hasta 60 días — la entrega es legal y no enfrentas arresto ni cargos mientras el bebé esté ileso",
      "Opción 1 — caja de bebé: coloca al recién nacido en una Safe Haven Baby Box en una estación de bomberos u hospital. Una alarma silenciosa alerta al personal de inmediato, que recoge al bebé en minutos. Sin cámaras, sin contacto cara a cara. NOTA: no hay cajas dentro de Fort Wayne — la más cercana está en Woodburn (mira el pin del mapa); cada estación de bomberos de Fort Wayne recibe bebés directamente (mira el pin de FW Fire Station 1)",
      "Opción 2 — entrega al bebé directamente a cualquier hospital, estación de bomberos, policía o trabajador de emergencias de turno, o llama al 911 y quédate con el bebé hasta que lleguen",
      "El bebé recibe un chequeo médico, luego DCS de Indiana lo coloca con un cuidador y empieza a buscar una familia adoptiva",
      "Tienes hasta 30 días para cambiar de opinión después de la entrega",
    ],
    tips: "No hay un botón que mande un hospital a tu ubicación — las cajas están en lugares fijos con personal. En una emergencia, llama al 911.",
  },
  "winter": {
    title: "Mantenerse caliente en invierno",
    intro: "El plan de refugio de invierno de Fort Wayne (1 dic – 31 mar): centros de calentamiento de día, camas de emergencia de noche cuando congela.",
    steps: [
      "Calentamiento de día: Rescue Mission, 404 E Washington Blvd — abierto 7am–6pm, los 7 días de la semana, sin importar la temperatura",
      "Bajo 32°F de noche: la Rescue Mission abre camas de emergencia por clima — 18+, sobrio al llegar, sin órdenes de arresto activas",
      "Mujeres y familias: Refugio de Emergencia de Contingencia de Invierno en Salvation Army, 2901 N Clinton St — 24/7, llega 6–10pm para ser admitida",
      "Familias: llama a Just Neighbors (260) 458-9772; mujeres solteras: llama a St. Joseph Missions (260) 426-7358 — si están llenos, regístrate en la Rescue Mission 4:30–6:30pm",
      "Extra de día: InAsMuch Ministry, 930 Broadway St — lun–vie 7:30–11:30am, más lunes en la noche 4:30–6:30pm",
    ],
    tips: "Si esta app muestra la alerta de frío ❄️, es probable que las camas de emergencia estén abiertas esta noche. Si crees que tienes prohibida la entrada a la Rescue Mission, llama al (260) 426-7357 ext. 156 entre 2–3pm para verificar tu estado.",
  },
  "ride-bus": {
    title: "Viajar en Citilink (bus)",
    intro: "El sistema de buses de Fort Wayne — $1.25 por viaje cubre la mayoría de los lugares de esta app.",
    bring: [
      "Tarifa exacta — los choferes no traen cambio",
    ],
    steps: [
      "Tarifa de adulto: $1.25 por viaje, o $3 por pase de todo el día — compra en el bus (cambio exacto) o paga en la app Token Transit",
      "Niños menores de 5 viajan gratis; de 5–18 años, adultos mayores de 60+, personas con discapacidades y beneficiarios de Medicare pagan $0.60",
      "Planea tu viaje: usa la app Transit Royale o llama a Citilink al (260) 432-4546 para planificación personal de viajes",
      "Sigue tu bus en vivo en la app DoubleMap para no esperar en el frío",
      "¿Nuevo en los buses? Entrenamiento de viaje gratis — en persona o virtual — en fwcitilink.com/traveltraining o (260) 265-1753",
      "Toca el botón 🚌 Bus en cualquier lugar de esta app para direcciones paso a paso en bus",
    ],
    tips: "Sin transbordos — cada abordaje es una tarifa nueva. Un pase de todo el día se paga solo después de 3 viajes.",
  },
  "free-bike": {
    title: "Conseguir una bicicleta gratis",
    intro: "Hay una forma real y verificada de conseguir una bicicleta gratis en Fort Wayne: gánala a través de un ministerio de bicicletas. Las bicicletas son gratis — solo pones unas horas primero.",
    bring: [
      "Tu identificación, si tienes — llama primero al (260) 444-2901 y pregunta qué llevar",
      "Ropa de trabajo (estarás arreglando bicicletas en el taller)",
    ],
    steps: [
      "Llama o pasa por Heart of the City Bike Ministry en 1651 Cass St un viernes en la mañana — es un programa de Heart of the City Mission Foundation",
      "Inscríbete en gánate-una-bici: 6 horas de servicio comunitario, O pasa dos viernes ayudando en el taller de bicicletas",
      "Trabaja tus horas junto a los voluntarios — también aprenderás a reparar bicicletas tú mismo",
      "Recoge tu bicicleta reconstruida y gratis cuando termines tus horas",
      "¿Necesitas aire o un ajuste después? Esta app lista 7 estaciones gratis de inflado/reparación de bicicletas en los senderos",
    ],
    tips: "Dejaron de simplemente regalar bicicletas — el requisito de esfuerzo es intencional, para que la bicicleta tenga valor real. La disponibilidad depende de donaciones, y los horarios de viernes pueden cambiar, así que llama al (260) 444-2901 antes.",
  },
  "free-vouchers": {
    title: "Conseguir vales gratis (gas, comida y más)",
    intro: "Lugares reales en Fort Wayne que reparten vales y tarjetas de regalo para comida, ropa, viajes en bus y más. Todo lo de abajo está verificado — pero los fondos de vales se acaban rápido, así que llama antes y pregunta temprano en el mes.",
    bring: [
      "Identificación con foto y prueba de domicilio (la mayoría de los lugares los piden)",
      "Si saliste recientemente de la cárcel o prisión: trae tus papeles de liberación (necesarios para vales de ropa del Salvation Army)",
    ],
    steps: [
      "St. Vincent de Paul (1600 S Calhoun St): vales gratis de ropa y muebles canjeables en su tienda de segunda mano — pregunta en la tienda o contacta una conferencia parroquial local de SVdP. Los voluntarios de SVdP también dan vales de comida para Community Harvest Food Bank y tarjetas de regalo de tiendas según se necesiten en 22 lugares del noreste de Indiana.",
      "Salvation Army (2901 N Clinton St, (260) 744-2311): pases de bus repartidos lunes/miércoles/viernes para trabajo, citas médicas o búsqueda de empleo — cantidad limitada cada mes, así que pregunta temprano. Vales de ropa para personas recién liberadas (identificación + papeles de liberación requeridos) o en situaciones de crisis (decidido caso por caso).",
      "Associated Churches (602 E Wayne St): a través de su alianza Meijer Simply Give, distribuye tarjetas de regalo de tiendas a familias necesitadas en su red de despensas de 130 iglesias — pregunta en el banco de comida.",
      "HEAL Farm Markets: cada verano, los vales de productos de SNAP, WIC y de adultos mayores se DUPLICAN ($1 en vales compra $2 en productos frescos) en tres mercados de Fort Wayne. La temporada 2026 terminó a principios de septiembre — llama al (425) 213-7516 o revisa sjchf.org para las fechas de 2027.",
      "Vales de gasolina: ningún programa en Fort Wayne anuncia vales de gasolina gratis todo el año. Tu mejor opción es llamar al 211 o al Salvation Army al (260) 744-2311 y preguntar por fondos actuales de viaje o ayuda con gasolina — cambian mes a mes y se acaban rápido. El Salvation Army también puede ayudar con las FACTURAS de luz/gas (no combustible) con cita cuando haya fondos — necesitas primero una carta de negación de tu township trustee.",
    ],
    tips: "El dinero de vales es limitado en todas partes — el inicio del mes es el mejor momento para preguntar. Siempre llama antes de viajar, y diles lo que necesitas (gasolina, pase de bus, ropa, comida) para que te dirijan al fondo correcto.",
  },
};




/* === guides-my.js === */
/* Haven FW — benefit guide translations: Burmese (မြန်မာ).
   Place names, street addresses, phone numbers and program names (SNAP, WIC, EBT, Medicaid…)
   stay in English; everything else is translated. */
"use strict";

const GUIDE_MY = {
  "snap": {
    title: "SNAP / EBT (အစားအစာ ထောက်ပံ့ငွေ)",
    intro: "ဈေးဝယ်စရာအတွက် EBT ကတ်ထဲ လစဉ်ငွေ ရမှာပါ။ ဝင်ငွေ နည်းရင် အရည်အချင်း ပြည့်မီနိုင်ပါတယ်။",
    bring: [
      "ဓာတ်ပုံပါ ID (ရှိတဲ့ ID ယူလာပါ — သူတို့ ကူညီပေးပါတယ်)",
      "ဝင်ငွေ သက်သေစာ — လစာငွေစာရွက်၊ ဒါမှမဟုတ် အလုပ်ရှင်ဆီက စာ",
      "လိပ်စာ သက်သေစာ — ငှားရမ်းစာချုပ်၊ စာ၊ ဒါမှမဟုတ် စခန်းက စာ",
      "အိမ်ထောင်စုဝင်တိုင်းရဲ့ Social Security နံပါတ်များ",
      "Utility ဘေလ်များ (ကိုယ်တိုင် ပေးချေရင်)",
    ],
    steps: [
      "fssabenefits.in.gov မှာ အွန်လိုင်း လျှောက်ပါ၊ ဒါမှမဟုတ် DFR ရုံးကို ကိုယ်တိုင် သွားပါ",
      "အင်တာဗျူး ဖြေပါ — caseworker က ဖုန်းဆက်တာ ဒါမှမဟုတ် တွေ့ဆုံပြီး သင့်အချက်အလက်ကို အတည်ပြုမှာပါ",
      "အဖြေ ရမှာပါ၊ အများအားဖြင့် ရက် ၃၀ အတွင်း (အရေးပေါ်ဆို ပိုမြန်ပါတယ်)",
      "EBT ကတ် စာတိုက်က ရောက်လာမှာပါ — ဈေးဆိုင်အများစုမှာ သုံးနိုင်ပါတယ်",
    ],
    tips: "ဝင်ငွေ လုံးဝ မရှိဘူးလား။ လျှောက်လွှာမှာ ပြောပါ — အရည်အချင်း ပြည့်မီနိုင်ပါသေးတယ်။ ဝင်ငွေ ဒါမှမဟုတ် လိပ်စာ ပြောင်းရင် အကြောင်းကြားပါ၊ ထောက်ပံ့ငွေ ဆက်ရဖို့ပါ။",
  },
  "medicaid": {
    title: "Medicaid (HIP နှင့် Hoosier Healthwise)",
    intro: "Indiana ပြည်နယ်က ပေးတဲ့ အခမဲ့ (ဒါမှမဟုတ် ကုန်ကျစရိတ် အနည်းငယ်) ကျန်းမာရေး အာမခံ။",
    bring: [
      "ဓာတ်ပုံပါ ID",
      "ဝင်ငွေ သက်သေစာ",
      "Indiana လိပ်စာ သက်သေစာ",
      "အိမ်ထောင်စုဝင်တွေရဲ့ Social Security နံပါတ်များ",
      "ရွှေ့ပြောင်းနေထိုင်မှု စာရွက်စာတမ်းများ (အမေရိကန် နိုင်ငံသား မဟုတ်ရင်)",
    ],
    steps: [
      "HIP က ဝင်ငွေ နည်းတဲ့ အရွယ် ၁၉–၆၄ ကို လွှမ်းခြုံပေးတယ် (၂၀၂၆ မှာ တစ်ကိုယ်တော် တစ်နှစ်လျှင် $22,000 ခန့်အထိ)",
      "Hoosier Healthwise က ကလေးတွေ၊ ကိုယ်ဝန်ဆောင်မိခင်တွေ၊ မိသားစုတွေကို လွှမ်းခြုံပေးတယ်",
      "DFR ရုံးမှာ၊ ဖုန်းနဲ့၊ ဒါမှမဟုတ် အွန်လိုင်း လျှောက်ပါ — ပြီးရင် အစီအစဉ် ရွေးပါ (Anthem, CareSource, သို့မဟုတ် MHS)",
      "Matthew 25 ဒါမှမဟုတ် Neighborhood Health လို အခမဲ့ ဆေးခန်းတွေမှာ ကတ်ပြပါ",
    ],
    tips: "Medicaid ရပြီး သားလား။ DFR မှာ လိပ်စာ အမြဲ အသစ် ထားပါ၊ မဟုတ်ရင် သက်တမ်းတိုးချိန်မှာ အာမခံ ဆုံးရှုံးနိုင်တယ်။",
  },
  "medicare": {
    title: "Medicare",
    intro: "အသက် ၆၅ နဲ့အထက်၊ ဒါမှမဟုတ် အရည်အချင်းပြည့်မီတဲ့ မသန်စွမ်းမှု ရှိရင် ဖက်ဒရယ် ကျန်းမာရေး အာမခံ။",
    bring: [
      "ဓာတ်ပုံပါ ID နဲ့ မွေးစာရင်း",
      "အမေရိကန် နိုင်ငံသား ဒါမှမဟုတ် တရားဝင် နေထိုင်ခွင့် သက်သေစာ",
      "အလုပ်သမိုင်း အချက်အလက် (မသန်စွမ်းမှုနဲ့ လျှောက်ရင်)",
    ],
    steps: [
      "ssa.gov မှာ အွန်လိုင်း လျှောက်ပါ၊ ဖုန်း 1-800-772-1213 ကို ဆက်ပါ၊ ဒါမှမဟုတ် ကိုယ်တိုင် သွားပါ",
      "အသက် ၆၅ ပြည့်တော့မှာလား။ မွေးနေ့လ မတိုင်ခင် ၃ လ အလိုက စပြီး စာရင်းသွင်းနိုင်ပါတယ်",
      "မသန်စွမ်းမှုနဲ့လား။ SSDI ငွေ ၂၄ လ ရပြီးနောက် Medicare စတင်တတ်ပါတယ်",
      "ဆေးဝါး လွှမ်းခြုံမှု (Part D) နဲ့ ငွေကြေးခက်ခဲရင် premium ပေးတဲ့ အစီအစဉ်တွေအကြောင်း ရုံးကို မေးပါ",
    ],
    tips: "ဝင်ငွေ နည်းလား။ Medicare Savings Programs အကြောင်း မေးပါ — premium နဲ့ တခြားဟာတွေကို သူတို့ ပေးနိုင်ပါတယ်။",
  },
  "wic": {
    title: "WIC (မိခင်များနှင့် ကလေးငယ်များ)",
    intro: "အခမဲ့ ကျန်းမာတဲ့ အစားအစာ၊ အာဟာရ အကူအညီ၊ နို့တိုက်ကျွေးမှု ထောက်ပံ့မှု။",
    bring: [
      "ကိုယ့်ရဲ့ ID နဲ့ စာရင်းသွင်းမယ့် ကလေးတိုင်းရဲ့ ID",
      "လက်ရှိ လိပ်စာ သက်သေစာ",
      "ဝင်ငွေ သက်သေစာ — လစာငွေစာရွက် ဒါမှမဟုတ် ထောက်ပံ့ငွေ စာ",
    ],
    steps: [
      "ရက်ချိန်း ကြိုတင် ဖုန်းဆက်ပါ — တိုက်ရိုက် လာရောက်သူ အကန့်အသတ် ရှိပါတယ်",
      "ပထမအကြိမ် လာရောက်ချိန်မှာ စာရင်းသွင်းမယ့်သူတိုင်း လာပါ",
      "WIC ကတ်ထဲ လစဉ် အစားအစာ ထောက်ပံ့ငွေ ထည့်ပေးမှာပါ",
      "WIC app သုံးပြီး လက်ကျန်ငွေ စစ်ပါ၊ ဆိုင်မှာ ဈေးဝယ်တာ စကင်န်ဖတ်ပါ",
    ],
    tips: "ကိုယ်ဝန်ဆောင်၊ မွေးပြီးစ၊ နို့တိုက်ကျွေးနေတာ၊ ဒါမှမဟုတ် ၅ နှစ်အောက် ကလေး ရှိလား။ ငွေကြေး ခက်ခဲရင် လျှောက်ပါ — WIC က SNAP နဲ့ သီးခြားပါ၊ နှစ်ခုလုံး ရနိုင်ပါတယ်။",
  },
  "ssi": {
    title: "SSI & Disability (SSDI)",
    intro: "မသန်စွမ်းမှုကြောင့် အလုပ် မလုပ်နိုင်ရင် လစဉ် ထောက်ပံ့ငွေ။",
    bring: [
      "ဓာတ်ပုံပါ ID နဲ့ Social Security ကတ်",
      "ဆေးမှတ်တမ်းများ — ဆရာဝန် အမည်များ၊ ဆေးရုံများ၊ ကုသမှု ရက်စွဲများ",
      "လွန်ခဲ့တဲ့ ၁၅ နှစ် ခန့်က အလုပ်သမိုင်း",
      "ဘဏ်အကောင့် အချက်အလက် (တိုက်ရိုက် ငွေလွှဲဖို့)",
    ],
    steps: [
      "ssa.gov မှာ အွန်လိုင်း လျှောက်ပါ၊ ဖုန်းနဲ့၊ ဒါမှမဟုတ် ကိုယ်တိုင် — SSI က လိုအပ်ချက်အခြေခံ၊ SSDI က အလုပ်သမိုင်း အခြေခံ",
      "ပထမ လျှောက်လွှာ အများစု ပယ်ချခံရတတ်တယ် — ရက် ၆၀ အတွင်း အယူခံဝင်ပါ၊ လက်မလျှော့ပါနဲ့",
      "Indiana Legal Services ကနေ အယူခံအတွက် အခမဲ့ အကူအညီ ရယူပါ: (260) 424-9155",
      "စောင့်ဆိုင်းနေစဉ် DFR ရုံးမှာ တခြား အရည်အချင်းပြည့်မီနိုင်တဲ့ အကူအညီတွေ မေးပါ",
    ],
    tips: "တင်သမျှ စာရွက်တိုင်း မိတ္တူ သိမ်းထားပါ၊ ရက်ချိန်းနဲ့ ဖုန်းခေါ်တိုင်း ရက်စွဲ ရေးမှတ်ထားပါ။",
  },
  "legal": {
    title: "အခမဲ့ ဥပဒေ အကူအညီ",
    intro: "ဝင်ငွေ နည်းသူတွေအတွက် အခမဲ့ အလုပ်လုပ်ပေးတဲ့ တကယ့် ရှေ့နေများ။",
    bring: [
      "ဓာတ်ပုံပါ ID",
      "ပြဿနာနဲ့ဆိုင်တဲ့ စာရွက်တွေ — နှင်ထုတ်စာ၊ ပယ်ချစာများ၊ တရားရုံး ရက်စွဲများ",
      "ဝင်ငွေ သက်သေစာ",
    ],
    steps: [
      "ဖုန်း (260) 424-9155 ဆက်ပါ — intake က အင်္ဂါ–ကြာသပတေး မနက် ၈:၃၀–၁၁:၃၀",
      "ဒါမှမဟုတ် indianalegalservices.org မှာ အွန်လိုင်း လျှောက်ပါ (မိနစ် ၂၀ ခန့် ကြာပါတယ်)",
      "အိမ်ရာ၊ ထောက်ပံ့ငွေ ပယ်ချမှု၊ အကြွေးပြဿနာ၊ မှတ်တမ်း ဖျက်သိမ်းမှု၊ အိမ်တွင်း အကြမ်းဖက်မှု ကိစ္စတွေ ကိုင်တွယ်ပါတယ်",
      "ရာဇဝတ်မှု ကိစ္စတွေ မကိုင်တွယ်ပါ — ဒါပေမယ့် အဲဒီကိစ္စဆို လွှဲပြောင်းပေးဖို့ တောင်းပါ",
    ],
    tips: "နှင်ထုတ်စာ ရထားလား။ ချက်ချင်း ဖုန်းဆက်ပါ — ပြန်ကြားရမယ့် သတ်မှတ်ချိန် တိုတောင်းပါတယ်။",
  },
  "bus": {
    title: "အခမဲ့ သွားလာနည်း",
    intro: "Citilink ကို ဈေးအပြည့် မပေးဘဲ စီးနည်း။",
    bring: [
      "ID ရှိရင် ယူလာပါ",
      "ဝင်ငွေ နည်းတာ ဒါမှမဟုတ် မသန်စွမ်းမှု ပြတဲ့ စာရွက်စာတမ်း (လျှော့ဈေး စီးဖို့)",
    ],
    steps: [
      "စခန်း၊ caseworker၊ ဒါမှမဟုတ် ဘုရားကျောင်း ကို မေးပါ — အများစုက သူတို့ လူတွေကို Citilink လက်မှတ် အခမဲ့ ပေးပါတယ်",
      "211 ကို ဖုန်းဆက်ပြီး သယ်ယူပို့ဆောင်ရေး အကူအညီ မေးပါ",
      "Citilink က သက်ကြီးရွယ်အိုနဲ့ မသန်စွမ်းသူတွေအတွက် လျှော့ဈေး လက်မှတ် ရောင်းပါတယ်",
      "Central Station က လမ်းကြောင်း မြေပုံနဲ့ ခရီး စီစဉ်ပါ — ဘတ်စ်က တနင်္လာ–စနေ ပြေးတယ်၊ တနင်္ဂနွေ မပြေးဘူး",
    ],
    tips: "လစဉ် လက်မှတ်က $45 ခန့် — နေ့တိုင်း စီးရင် ၂ ပတ်အတွင်း တန်သွားပါပြီ။",
  },
  "meds": {
    title: "အခမဲ့ ဆေးဝါး",
    intro: "ငွေ မပေးနိုင်တဲ့အခါ Fort Wayne မှာ ဆေးညွှန်း ရယူနိုင်တဲ့ တကယ့် နည်းလမ်းများ။",
    bring: [
      "ဓာတ်ပုံပါ ID",
      "လက်ရှိ သောက်နေတဲ့ ဆေးဗူးများ ဒါမှမဟုတ် ဆေးစာရင်း",
      "အာမခံ မရှိတာ ဒါမှမဟုတ် ဝင်ငွေ နည်းတာ သက်သေစာ (လစာငွေစာရွက် ဒါမှမဟုတ် ထောက်ပံ့ငွေ စာ)",
    ],
    steps: [
      "Matthew 25 မှာ လူနာ ဖြစ်ပါ — သူတို့ လူနာတွေကို ဆေးဝါး အခမဲ့ ပေးပါတယ်",
      "ဆရာဝန်ကို generic ဆေး အမြဲ တောင်းပါ — တံဆိပ်ဆေးထက် အများကြီး ဈေးသက်သာပါတယ်",
      "မည်သည့် ဆေးဆိုင်မှာမဆို GoodRx ကူပွန် အခမဲ့ ပြပါ၊ ဈေး လျှော့ပေးမှာပါ၊ အာမခံ မလိုပါဘူး",
      "ဆေးဆိုင် ကို ထုတ်လုပ်သူ လူနာ အကူအညီ အစီအစဉ်တွေ (RxAssist, NeedyMeds) အကြောင်း မေးပါ — ဝင်ငွေ နည်းရင် တံဆိပ်ဆေး အခမဲ့ ပေးတာ အများကြီးပါ",
      "211 ကို ဖုန်းဆက်ပြီး ဆေးညွှန်း အကူအညီ အစီအစဉ်တွေ မေးပါ",
    ],
    tips: "ဆေးချွေတာဖို့ ဆေးသောက်တာ ဘယ်တော့မှ မပျက်ကွက်ပါနဲ့ — ဆေးခန်းကို အရင် ပြောပါ။ ဈေးသက်သာတာ ဒါမှမဟုတ် အခမဲ့ဆေး ပြောင်းပေးနိုင်တာ အများကြီးပါ။",
  },
  "therapy": {
    title: "အခမဲ့ နှင့် ဈေးသက်သာ စိတ်ကျန်းမာရေး အကြံဉာဏ်",
    intro: "ငွေ မရှိလည်း၊ အာမခံ မရှိလည်း Fort Wayne မှာ စိတ်ကျန်းမာရေး အကြံဉာဏ် နဲ့ အကူအညီ။",
    bring: [
      "ဓာတ်ပုံပါ ID",
      "ဝင်ငွေ သက်သေစာ (ရှိရင် — အခကြေးငွေ အဆင့်လိုက် သတ်မှတ်ဖို့)",
      "သောက်နေတဲ့ ဆေးဝါး စာရင်း",
    ],
    steps: [
      "Park Center ကို (260) 481-2700 ဖုန်းဆက်ပြီး intake တောင်းပါ — ဝင်ငွေအလိုက် အခကြေးငွေ လျှော့ပါတယ်",
      "အာမခံ မရှိဘူးလား။ ပြောပါ — Medicaid နဲ့ အာမခံ မရှိသူတွေကို သူတို့ လက်ခံပါတယ်",
      "Group therapy နဲ့ ထောက်ပံ့ရေး အဖွဲ့တွေ မေးပါ — အများအားဖြင့် အခမဲ့ပါ",
      "တခြား အခမဲ့ အကြံဉာဏ် ရွေးချယ်စရာတွေ (ဘာသာရေး အခြေခံတွေပါ) 211 ကို ဖုန်းဆက်မေးပါ",
    ],
    tips: "အရေးပေါ်ဆို 988 ကို ဘယ်အချိန်မဆို ဖုန်းဆက် ဒါမှမဟုတ် စာပို့ပါ — အခမဲ့၊ ၂၄ နာရီ၊ အာမခံ ဒါမှမဟုတ် ရက်ချိန်း မလိုပါဘူး။",
  },
  "bus-passes": {
    title: "အခမဲ့ ဘတ်စ်လက်မှတ်များ",
    intro: "အခမဲ့ Citilink လက်မှတ် တကယ် ရနိုင်တဲ့ နေရာများ။",
    bring: [
      "ID ရှိရင် ယူလာပါ",
      "ဘာကြောင့် လိုတယ်ဆိုတာ ပြတဲ့ စာရွက် — စခန်းက စာ၊ caseworker မှတ်စု၊ ဒါမှမဟုတ် အလုပ်အင်တာဗျူး အချက်အလက်",
    ],
    steps: [
      "စခန်း၊ caseworker၊ ဒါမှမဟုတ် ဘုရားကျောင်း ကို အရင် မေးပါ — အများစုက သူတို့ လူတွေကို Citilink လက်မှတ် အခမဲ့ ပေးပါတယ်",
      "211 ကို ဖုန်းဆက်ပြီး သယ်ယူပို့ဆောင်ရေး အကူအညီနဲ့ ဘတ်စ်လက်မှတ် အစီအစဉ်တွေ မေးပါ",
      "အလုပ် ရှာနေစဉ် အင်တာဗျူး သွားဖို့ လက်မှတ်တွေ WorkOne career coach ကို မေးပါ",
      "သက်ကြီးရွယ်အို ဒါမှမဟုတ် မသန်စွမ်းသူ ဆို Central Station မှာ Citilink လျှော့ဈေး လက်မှတ် လျှောက်ပါ",
      "ဘယ် ဘတ်စ် စီးရမလဲ သိဖို့ Central Station က စက္ကူ လမ်းကြောင်း မြေပုံ ယူပါ",
    ],
    tips: "ဘာအတွက် စီးမလဲဆိုတာ တိတိကျကျ ပြောပါ — အလုပ်၊ ဆေးရက်ချိန်း၊ အင်တာဗျူး။ ရည်ရွယ်ချက် ရှိတဲ့ ခရီးတွေကို အစီအစဉ်တွေ ဦးစားပေးပါတယ်။",
  },
  "gift-cards": {
    title: "အခမဲ့ အစားအစာ လက်ဆောင်ကတ်များ",
    intro: "အစိုးရ အစီအစဉ် မရှိပါ — ဒါပေမယ့် ဘုရားကျောင်းနဲ့ ပရဟိတ အဖွဲ့တွေ ဈေးဝယ် လက်ဆောင်ကတ် ပေးပါတယ်။ ဘယ်မှာ တောင်းရမလဲ။",
    bring: [
      "ဓာတ်ပုံပါ ID",
      "လိပ်စာ သက်သေစာ (ဘေလ်၊ ငှားရမ်းစာချုပ်၊ ဒါမှမဟုတ် စခန်းက စာ)",
      "သင့်အခြေအနေ ရှင်းပြဖို့ အသင့်ပြင်ပါ — ကလေးတွေ၊ မီးဖိုချောင် မရှိတာ၊ သွားလာရေး မရှိတာ",
    ],
    steps: [
      "211 ကို ဖုန်းဆက်ပြီး လက်ဆောင်ကတ် ဒါမှမဟုတ် ဈေးဝယ် အကူအညီ တိတိကျကျ မေးပါ",
      "ဘုရားကျောင်း ရုံးတွေမှာ မေးပါ — St. Vincent de Paul parish conferences နဲ့ ဘုရားကျောင်း ကူညီရေးရန်ပုံငွေတွေက အဓိက ရင်းမြစ်ပါ",
      "Salvation Army နဲ့ Just Neighbors မှာ အရေးပေါ် အစားအစာ အကူအညီ မေးပါ — ကတ်တွေကို တစ်ဦးချင်း ပေးတတ်ပါတယ်",
      "အစားအစာ ဖြန့်ဝေရေးနေရာတွေမှာ ဈေးဆိုင် ကတ် ပေးတတ်လား မေးပါ၊ အထူးသဖြင့် အားလပ်ရက်တွေနားမှာ",
      "စခန်းမှာ နေရင် ဝန်ထမ်းကို မေးပါ — အများစုက အရေးပေါ် ကတ် အနည်းငယ် သိမ်းထားတတ်ပါတယ်",
    ],
    tips: "ကတ် အများစုက ဈေးဆိုင်အတွက်ပါ၊ အမြန်စာအတွက်မဟုတ်ဘူး — အိမ်ထောင်စုတစ်ခုကို တစ်ကတ်၊ ပုံမှန် မဟုတ်ဘူး။ ယဉ်ကျေးပါ၊ ရိုးသားပါ၊ တစ်နေရာတည်းကို ဆက်တိုက် နှစ်ခါ မတောင်းပါနဲ့။",
  },
  "addiction": {
    title: "စွဲလမ်းမှုအတွက် အကူအညီ ရယူနည်း",
    intro: "Fort Wayne မှာ အရက် ဒါမှမဟုတ် မူးယစ်ဆေး ပြဿနာအတွက် အကူအညီ — detox၊ rehab၊ အခမဲ့ ထောက်ပံ့ရေး အဖွဲ့များ။ အကူအညီ တောင်းတာက အခက်ခဲဆုံး အပိုင်း၊ ကျန်တာ လာရောက်ရုံပါပဲ။",
    bring: [
      "ဓာတ်ပုံပါ ID (ရှိရင်)",
      "အာမခံ ကတ် ဒါမှမဟုတ် Medicaid အချက်အလက် (ရှိရင် — အာမခံ မရှိလည်း နေရာအများစု လက်ခံပါတယ်)",
      "သောက်နေတဲ့ ဆေးဝါး စာရင်း",
      "ညအိပ် နေရနိုင်ရင် အခြေခံ ပစ္စည်းတွေ ထည့်တဲ့ အိတ် (detox/rehab)",
    ],
    steps: [
      "SAMHSA National Helpline ကို 1-800-662-4357 ဖုန်းဆက်ပါ — အခမဲ့၊ လျှို့ဝှက်၊ ၂၄ နာရီ၊ ဒေသခံ အစီအစဉ်နဲ့ ချိတ်ဆက်ပေးမှာပါ",
      "ခု detox လိုနေလား။ Parkview Behavioral Health (260-373-7500) က ၂၄ နာရီ တိုက်ရိုက် လာရောက်သူ လက်ခံတယ်၊ Medicaid လည်း လက်ခံတယ်",
      "နေထိုင်ရေး rehab လိုလား။ Fort Wayne Recovery (833-762-3739) က ၂၄ နာရီ intake လုပ်တယ်၊ အိမ်ရာနဲ့ အလုပ်ပါ ကူညီတယ်",
      "Opioid သုံးနေလား။ BHG Fort Wayne (260-420-6010) က methadone/Suboxone ပြင်ပ လူနာ ကုသမှု၊ ရုံးဖွင့်ရက် မနက်ပိုင်းတွေ",
      "ထောင် ဒါမှမဟုတ် ခဏတာ ကုသမှုက ထွက်တဲ့ အမျိုးသမီးများ: Redemption House (260-745-1005) က ၆ လ ဘာသာရေး အခြေခံ နေအိမ် ပေးတယ်",
      "အခမဲ့ ဆက်လက် ထောက်ပံ့မှုအတွက် AA အစည်းအဝေး (260-471-6262) ဒါမှမဟုတ် NA အစည်းအဝေး (260-427-9113) ကို တိုက်ရိုက် ဝင်ပါ — စာရင်းသွင်းစရာ မလို၊ အခမဲ့",
    ],
    tips: "\"အဆင်သင့်\" ဖြစ်စရာ ဒါမှမဟုတ် အနိမ့်ဆုံး ရောက်စရာ မလိုဘူး — စဉ်းစားနေတုန်း ဖုန်းဆက်ပါ။ သုံးနေပြီး ဆေးလွန်မှာကြောက်ရင် Indiana ရဲ့ Lifeline Law က 911 ကို အကူအညီ တောင်းတဲ့ သူတွေကို ကာကွယ်ပေးတယ်။",
  },
  "freephone": {
    title: "အခမဲ့ ဖုန်း ရယူနည်း (Lifeline)",
    intro: "ဖက်ဒရယ် Lifeline အစီအစဉ်က ဝင်ငွေ နည်းတဲ့ အိမ်ထောင်စုတွေကို ဖုန်း ဒါမှမဟုတ် အင်တာနက် ဝန်ဆောင်မှုအတွက် လစဉ် $9.25 လျှော့ဈေး ပေးတယ် — Indiana က ဝန်ဆောင်မှုပေးသူ အများအပြားက အခမဲ့ အခြေခံ စမတ်ဖုန်းပါ ထည့်ပေးတယ်။",
    bring: [
      "အရည်အချင်းပြည့်မီတာ သက်သေစာ — ထောက်ပံ့ငွေ စာ (SNAP, Medicaid, SSI စသည်) ဒါမှမဟုတ် ဝင်ငွေ ဆင်းရဲမှုမျဉ်း၏ 135% ဒါမှမဟုတ် အောက် ဖြစ်တာ သက်သေစာ",
      "လိပ်စာ သက်သေစာ",
      "အထောက်အထား သက်သေစာ (ဓာတ်ပုံပါ ID)",
    ],
    steps: [
      "အရည်အချင်းပြည့်မီမီ စစ်ပါ: SNAP, Medicaid, SSI, public housing, Veterans Pension — ဒါမှမဟုတ် ဝင်ငွေ ဖက်ဒရယ် ဆင်းရဲမှုမျဉ်း၏ 135% ဒါမှမဟုတ် အောက်။ အိမ်ထောင်စုတစ်ခုကို တစ်ခု။",
      "FCC ရဲ့ National Verifier ကနေ nv.fcc.gov (ဒါမှမဟုတ် checklifeline.usac.org) မှာ လျှောက်ပါ — ဒါက အစိုးရ တရားဝင် အတည်ပြုချက် အဆင့်ပါ",
      "Indiana Lifeline ဝန်ဆောင်မှုပေးသူ ရွေးပါ: Assurance Wireless (T-Mobile မှာ အခမဲ့ ဖုန်း + အစီအစဉ်၊ 1-888-321-5880), SafeLink Wireless (အခမဲ့ ဖုန်း ဒါမှမဟုတ် အခမဲ့ SIM၊ 1-800-378-1684), သို့မဟုတ် enTouch Wireless (ကိုယ့်ဖုန်းအတွက် အခမဲ့ SIM၊ 1-866-488-8719)",
      "ရွေးထားတဲ့ ဝန်ဆောင်မှုပေးသူနဲ့ စာရင်းသွင်းပါ — သူတို့ အခမဲ့ ဖုန်း ဖွင့်ပေးမယ် ဒါမှမဟုတ် ပို့ပေးမယ်",
      "ထောက်ပံ့ငွေ ဆက်ရဖို့ တစ်နှစ်တစ်ခါ ပြန်လည် အတည်ပြုပါ",
    ],
    tips: "ဟောင်း Affordable Connectivity Program (ACP) က ၂၀၂၄ ဇွန်လမှာ ပြီးဆုံးသွားပါပြီ — ဘယ်သူမဆို ACP အတွက် စာရင်းသွင်းခိုင်းရင် လိမ်ညာမှု ဒါမှမဟုတ် ခေတ်နောက်ကျ သတင်းပါ။ Lifeline က ခု အသက်ဝင်နေတဲ့ အစီအစဉ်ပါ။",
  },
  "freedata": {
    title: "အခမဲ့ အင်တာနက် နှင့် WiFi",
    intro: "Fort Wayne တစ်မြို့လုံးမှာ အခမဲ့ WiFi နေရာများ — စာကြည့်တိုက်များ၊ ကော်ဖီဆိုင်များ၊ အမြန်စာ ဆိုင်များ — အရည်အချင်းပြည့်မီရင် အခမဲ့ data လျှော့ဈေးပါ ရနိုင်တယ်။",
    steps: [
      "မြို့လယ်မှာ အကောင်းဆုံး အခမဲ့ အင်တာနက်: Allen County Public Library ပင်မဌာန၊ 900 Library Plz (တနင်္လာ–ကြာသပတေး ၉–၉၊ သောကြာ–စနေ ၉–၆၊ တနင်္ဂနွေ ၁၂–၅ ဖွင့်) — အခမဲ့ WiFi၊ ထိုင်ခုံ၊ ပလပ်ပေါက်",
      "အနောက်မြောက် အနီး: ACPL Little Turtle ဌာန၊ 2201 Sherman Blvd (တနင်္လာ–ဗုဒ္ဓဟူး ၁၀–၉၊ ကြာသပတေး–စနေ ၁၀–၆)",
      "ညနက်အထိ: McDonald's၊ 255 E Coliseum Blvd (၂၄ နာရီ drive-thru) ဒါမှမဟုတ် 1103 Goshen Rd — အခမဲ့ WiFi၊ စာကြည့်တိုက် ပိတ်ချိန်မှာ အဆင်ပြေတယ်",
      "ထိုင်ခုံ သက်တောင့်သက်သာ၊ စောစော ဖွင့်: Starbucks၊ 301 E Coliseum Blvd (နေ့တိုင်း မနက် ၄:၃၀–ည ၉:၃၀) ဒါမှမဟုတ် 5723 Coventry Ln (အနောက်တောင်)",
      "ကိုယ့်ဖုန်းမှာ data လိုလား။ အထက်က Lifeline အစီအစဉ်မှာ ဝန်ဆောင်မှုပေးသူ အများစုရဲ့ အခမဲ့ အစီအစဉ်နဲ့ လစဉ် မြန်နှုန်းမြင့် data ပါတယ် — အခမဲ့ ဖုန်း လမ်းညွှန် ကြည့်ပါ",
      "WiFi သုံးဖို့ စာကြည့်တိုက် ကတ် မလိုဘူး — ထိုင်ပါ၊ ချိတ်ဆက်ပါ၊ အင်တာနက် သုံးပါ",
    ],
    tips: "အများသုံး WiFi က ရှာဖွေတာ၊ အလုပ် လျှောက်တာ အတွက် အဆင်ပြေတယ်၊ ဒါပေမယ့် ဘဏ်အကောင့် ဝင်တာ ရှောင်ပါ။ စက်ပစ္စည်း မရှိရင် စာကြည့်တိုက်တွေမှာ အခမဲ့ ကွန်ပျူတာနဲ့ ပရင်တာ ရှိပါတယ်။",
  },
  "lgbtq": {
    title: "Fort Wayne မှာ LGBTQ+ ထောက်ပံ့မှု",
    intro: "ကိုယ်တိုင် ဖြစ်နိုင်တဲ့ Fort Wayne က နေရာများ — အသိုင်းအဝိုင်း၊ ကျန်းမာရေးစောင့်ရှောက်မှု၊ ဥပဒေ အကူအညီ၊ နားလည်တဲ့ အရေးပေါ် ဖုန်းလိုင်းများ။",
    steps: [
      "အသိုင်းအဝိုင်း လိုလား။ Fort Wayne Pride Center (527 W Berry St) က လစဉ် ထောက်ပံ့ရေး အဖွဲ့တွေနဲ့ လူမှုရေး ပွဲတွေ လုပ်တယ် — ပြက္ခဒိန်အတွက် fwpride.org ကြည့်ပါ။ Trans ဒါမှမဟုတ် nonbinary ပြီး ၁၈+ လား။ Evolution X က ၄ ကြိမ်မြောက် အင်္ဂါနေ့၊ ည ၇–၉ တွေ့ဆုံတယ်။",
      "လက်ခံ အသိအမှတ်ပြု ကျန်းမာရေးစောင့်ရှောက်မှု လိုလား။ Planned Parenthood Fort Wayne (2930 Lake Ave, 1-800-769-0045) က informed-consent ပုံစံနဲ့ gender-affirming ဟော်မုန်း ကုထုံး ပေးတယ် — therapist စာ မလိုဘူး — ဝင်ငွေအလိုက် ဈေးနဲ့ STI စစ်ဆေးမှုပါ။",
      "အခမဲ့ HIV/STD စစ်ဆေးမှု လိုလား။ Positive Resource Connection (525 Oxford St, 260-744-1144) က ရက်ချိန်း မလိုဘဲ အခမဲ့ လျှို့ဝှက် စစ်ဆေးမှု ပေးတယ်၊ အာမခံ မရှိသူတွေအတွက် PrEP လည်း ရှိတယ်။",
      "ဥပဒေ အကူအညီ လိုလား။ Indiana Legal Services ရဲ့ LGBTQ+ Project (110 W Berry St, 260-424-9155) က အမည် နဲ့ gender-marker ပြောင်းတာ အခမဲ့ လုပ်ပေးတယ်၊ ခွဲခြားဆက်ဆံမှုကို တိုက်ဖျက်တယ်၊ gender-affirming စောင့်ရှောက်မှု အာမခံ လွှမ်းခြုံဖို့ ကူညီတယ်။",
      "ငယ်ရွယ်ပြီး စကားပြောဖော် လိုလား။ The Center for Nonviolence (260-456-4112) က LGBTQ+ လူငယ် အဖွဲ့ လုပ်တယ်၊ Trevor Project (1-866-488-7386) က ၂၄ နာရီ ရှိတယ်။",
    ],
    tips: "ဒီနေရာတွေမှာ အကူအညီ ရဖို့ ကိုယ် ဘယ်သူလဲဆိုတာ ရှင်းပြ ဒါမှမဟုတ် ခုခံကာကွယ်စရာ မလိုဘူး — ဒါပဲ သူတို့ရဲ့ ရည်ရွယ်ချက်ပါ။",
  },
  "freefood": {
    title: "Fort Wayne မှာ အခမဲ့ အစားအစာ",
    intro: "Fort Wayne မှာ အခမဲ့ စားဖို့ နည်း ၃ ခု: ဈေးဝယ်စရာ အစားအစာ ဘဏ်များ၊ နေ့တိုင်း ကျွေးတဲ့ ပူပူနွေးနွေး ထမင်းများ၊ ယူသွားလို့ရတဲ့ အိတ်လန့်ချ်။",
    steps: [
      "ဈေးဝယ်စရာ လိုလား။ Community Harvest Food Bank နဲ့ Miss Virginia's လို ရပ်ကွက် အစားအစာ ဖြန့်ဝေရေးနေရာတွေ အခမဲ့ အစားအစာ ပေးတယ် — အိတ် ယူသွားပါ၊ မသွားခင် ဖွင့်ချိန် စစ်ပါ။",
      "ဒီနေ့ ပူပူနွေးနွေး ထမင်း လိုလား။ St. Mary's Soup Kitchen က အခမဲ့ ပူပူနွေးနွေး ထမင်း ကျွေးတယ် — လိပ်စာ၊ ဖွင့်ချိန်၊ လမ်းညွှန်အတွက် သူတို့ ကတ် နှိပ်ပါ။",
      "ယူသွားလို့ရတဲ့ အိတ်လန့်ချ် လိုလား။ The Franciscan Center (4643 Gaywood Dr) က စနေနေ့တိုင်း အခမဲ့ အိတ်လန့်ချ် ၁,၂၀၀+ ပေးတယ် — လာရုံပဲ၊ ရက်ချိန်း ဒါမှမဟုတ် ID မလိုဘူး။",
      "အလျင်လိုနေလား။ Places တက်ဘ်မှာ \"bag lunch\" ရှာပြီး အနီးနား အိတ်လန့်ချ် နေရာတွေ ရှာပါ။",
    ],
    tips: "အစားအစာ နေရာ အများစုက အရင်လာ အရင်ရ — မနက်စောစော သွားရင် ရွေးချယ်စရာ အကောင်းဆုံးပါ။ ဖွင့်ချိန် ပြောင်းနိုင်လို့ ကြိုဖုန်းဆက်တာ ဘယ်တော့မှ မမှားဘူး။",
  },
  "safehaven": {
    title: "မွေးကင်းစ ကလေးငယ်များအတွက် Safe Haven",
    intro: "မွေးကင်းစ ကလေး မစောင့်ရှောက်နိုင်ရင် Indiana ဥပဒေက ကလေးကို ဘေးကင်းစွာ၊ အမည်မဖော်ဘဲ၊ တရားဝင် အပ်နှံနိုင်တယ်။",
    steps: [
      "၂၄ နာရီ Safe Haven Hotline ကို 1-866-99BABY1 (1-866-992-2291) ဖုန်းဆက်ပါ — လိုင်စင်ရ အကြံပေးများ၊ လုံးဝ လျှို့ဝှက်၊ အပ်နှံဖို့ ဒါမှမဟုတ် ကလေး ဆက်ထိန်းဖို့ အရင်းအမြစ် ကူညီနိုင်တယ်",
      "Indiana ရဲ့ Safe Haven ဥပဒေက ၆၀ ရက်အထိ မွေးကင်းစတွေ လွှမ်းခြုံတယ် — အပ်နှံတာ တရားဝင်တယ်၊ ကလေး ထိခိုက်မှု မရှိရင် ဖမ်းဆီးခံရတာ ဒါမှမဟုတ် တရားစွဲခံရတာ မရှိဘူး",
      "ရွေးချယ်စရာ ၁ — baby box: မီးသတ်စခန်း ဒါမှမဟုတ် ဆေးရုံက Safe Haven Baby Box ထဲ မွေးကင်းစ ထည့်ပါ။ တိတ်ဆိတ် သတိပေးစနစ်က အထဲက ဝန်ထမ်းကို ချက်ချင်း အသိပေးတယ်၊ မိနစ်ပိုင်းအတွင်း ကလေး ထုတ်ယူတယ်။ ကင်မရာ မရှိ၊ မျက်နှာချင်းဆိုင် မတွေ့ရဘူး။ မှတ်ချက်: Fort Wayne မြို့ထဲမှာ box မရှိဘူး — အနီးဆုံးက Woodburn (မြေပုံ pin ကြည့်ပါ); Fort Wayne မီးသတ်စခန်းတိုင်းက ကလေး တိုက်ရိုက် လက်ခံတယ် (FW Fire Station 1 pin ကြည့်ပါ)",
      "ရွေးချယ်စရာ ၂ — တာဝန်ကျ ဆေးရုံ၊ မီးသတ်စခန်း၊ ရဲ၊ ဒါမှမဟုတ် EMS ဝန်ထမ်းကို ကလေး တိုက်ရိုက် အပ်ပါ၊ ဒါမှမဟုတ် 911 ခေါ်ပြီး ကယ်ဆယ်ရေးသမား ရောက်တဲ့အထိ ကလေးနဲ့ အတူ နေပါ",
      "ကလေး ဆေးစစ်ခံရမယ်၊ ပြီးရင် Indiana DCS က စောင့်ရှောက်သူနဲ့ ထားပြီး မွေးစားမိသားစု ရှာဖွေမှု စတယ်",
      "အပ်နှံပြီးနောက် စိတ်ပြောင်းဖို့ ရက် ၃၀ အထိ အချိန် ရှိတယ်",
    ],
    tips: "သင့်ဆီ ဆေးရုံ ပို့ပေးမယ့် ခလုတ် မရှိဘူး — box တွေက ပုံသေ၊ ဝန်ထမ်းရှိတဲ့ နေရာတွေပါ။ အရေးပေါ်ဆို 911 ခေါ်ပါ။",
  },
  "winter": {
    title: "ဆောင်းရာသီမှာ နွေးထွေးစွာ နေထိုင်နည်း",
    intro: "Fort Wayne ရဲ့ ဆောင်း စခန်း အစီအစဉ် (ဒီဇင်ဘာ ၁ – မတ် ၃၁): နေ့ဘက် အနွေးဓာတ် စင်တာများ၊ အေးခဲတဲ့ ညတွေမှာ အရေးပေါ် အိပ်ယာများ။",
    steps: [
      "နေ့ဘက် အနွေးဓာတ်: Rescue Mission၊ 404 E Washington Blvd — မနက် ၇–ညနေ ၆၊ တစ်ပတ် ၇ ရက်၊ အပူချိန် ဘယ်လိုဖြစ်ဖြစ် ဖွင့်",
      "ညဘက် 32°F အောက်: Rescue Mission က အရေးပေါ် ရာသီဥတု အိပ်ယာ ဖွင့်တယ် — ၁၈+၊ ရောက်ချိန် မူးယစ်ကင်းစင်ရမယ်၊ ဖမ်းဝရမ်း မရှိရဘူး",
      "အမျိုးသမီးနဲ့ မိသားစုများ: Salvation Army၊ 2901 N Clinton St က Winter Contingency Emergency Shelter — ၂၄ နာရီ၊ ညနေ ၆–၁၀ အတွင်း ရောက်မှ ဝင်ခွင့်ရမယ်",
      "မိသားစုများ: Just Neighbors ကို (260) 458-9772 ဖုန်းဆက်ပါ; တစ်ကိုယ်တော် အမျိုးသမီးများ: St. Joseph Missions ကို (260) 426-7358 ဆက်ပါ — ပြည့်နေရင် Rescue Mission မှာ ညနေ ၄:၃၀–၆:၃၀ အတွင်း စာရင်းသွင်းပါ",
      "နေ့ဘက် ထပ်ဆောင်း: InAsMuch Ministry၊ 930 Broadway St — တနင်္လာ–သောကြာ မနက် ၇:၃၀–၁၁:၃၀၊ တနင်္လာညနေ ၄:၃၀–၆:၃၀ ပါ",
    ],
    tips: "ဒီ app က ❄️ အအေး သတိပေးချက် ပြရင် ဒီည အရေးပေါ် အိပ်ယာ ဖွင့်ဖို့ များတယ်။ Rescue Mission က တားမြစ်ထားတယ်လို့ ထင်ရင် (260) 426-7357 ext. 156 ကို နေ့လယ် ၂–၃ နာရီ အတွင်း ဖုန်းဆက်ပြီး အခြေအနေ စစ်ပါ။",
  },
  "ride-bus": {
    title: "Citilink (ဘတ်စ်) စီးနည်း",
    intro: "Fort Wayne ရဲ့ ဘတ်စ်စနစ် — တစ်ကြိမ် $1.25 နဲ့ ဒီ app ထဲက မှတ်တိုင်အများစု ရောက်တယ်။",
    bring: [
      "အတိအကျ ဈေးနှုန်း — ယာဉ်မောင်းတွေ အကြွေ မဆောင်ထားဘူး",
    ],
    steps: [
      "လူကြီး ဈေး: တစ်ကြိမ် $1.25၊ ဒါမှမဟုတ် တစ်နေ့လုံး လက်မှတ် $3 — ဘတ်စ်ပေါ် ဝယ် (အတိအကျ) ဒါမှမဟုတ် Token Transit app မှာ ပေး",
      "၅ နှစ်အောက် ကလေး အခမဲ့; ၅–၁၈၊ သက်ကြီး ၆၀+၊ မသန်စွမ်းသူ၊ Medicare ကိုင်ဆောင်သူ $0.60",
      "ခရီး စီစဉ်ပါ: Transit Royale app သုံးပါ၊ ဒါမှမဟုတ် (260) 432-4546 ကို ဖုန်းဆက်ပြီး ကိုယ်ပိုင် ခရီး စီစဉ်ခိုင်းပါ",
      "အအေးထဲ စောင့်မနေရအောင် DoubleMap app မှာ ဘတ်စ် တိုက်ရိုက် ခြေရာခံပါ",
      "ဘတ်စ် အသစ်လား။ အခမဲ့ ခရီးသွား သင်တန်း — ကိုယ်တိုင် ဒါမှမဟုတ် အွန်လိုင်း — fwcitilink.com/traveltraining ဒါမှမဟုတ် (260) 265-1753",
      "ဒီ app ထဲက ဘယ်နေရာမှာမဆို 🚌 Bus ခလုတ် နှိပ်ပြီး အဆင့်ဆင့် ဘတ်စ် လမ်းညွှန် ရယူပါ",
    ],
    tips: "ပြောင်းစီးလက်မှတ် မရှိ — တစ်ခါ တက်တိုင်း ဈေးအသစ်။ တစ်နေ့လုံး လက်မှတ်က ၃ ကြိမ် စီးပြီးရင် တန်သွားပြီ။",
  },
  "free-bike": {
    title: "အခမဲ့ စက်ဘီး ရယူနည်း",
    intro: "Fort Wayne မှာ အခမဲ့ စက်ဘီး ရနိုင်တဲ့ တကယ့်၊ အတည်ပြုပြီးတဲ့ နည်းလမ်း ရှိတယ်: bike ministry ကနေ ကြိုးစားယူပါ။ စက်ဘီးက အခမဲ့ — အရင် နာရီ အနည်းငယ် လုပ်အားပေးရုံပဲ။",
    bring: [
      "ID (ရှိရင်) — အရင် (260) 444-2901 ကို ဖုန်းဆက်ပြီး ဘာယူလာရမလဲ မေးပါ",
      "အလုပ် အဝတ်အစား (ဆိုင်မှာ စက်ဘီး ပြင်ရမှာမို့)",
    ],
    steps: [
      "သောကြာမနက် 1651 Cass St က Heart of the City Bike Ministry ကို ဖုန်းဆက် ဒါမှမဟုတ် သွားပါ — သူတို့က Heart of the City Mission Foundation ရဲ့ အစီအစဉ်ပါ",
      "earn-a-bike အတွက် စာရင်းသွင်းပါ: ရပ်ရွာ ဝန်ဆောင်မှု ၆ နာရီ၊ ဒါမှမဟုတ် သောကြာ ၂ ပတ် စက်ဘီးဆိုင်မှာ ကူညီပါ",
      "စေတနာ့ဝန်ထမ်းတွေနဲ့ အတူ နာရီတွေ လုပ်ပါ — စက်ဘီး ကိုယ်တိုင် ပြင်တတ်အောင်လည်း သင်ရမှာပါ",
      "နာရီ ပြည့်ရင် ပြန်လည် တည်ဆောက်ထားတဲ့ အခမဲ့ စက်ဘီး ထုတ်ယူပါ",
      "နောက်မှ လေ ဒါမှမဟုတ် ပြင်ဆင်မှု လိုလား။ ဒီ app မှာ လမ်းကြောင်းတွေပေါ်က အခမဲ့ စက်ဘီးလေထိုးစက်/ပြင်ဆင်ရေး စခန်း ၇ ခု စာရင်းရှိတယ်",
    ],
    tips: "စက်ဘီး အလွယ်တကူ ပေးတာ ရပ်လိုက်ပြီ — ကြိုးစားခိုင်းတာ ရည်ရွယ်ချက်ရှိရှိ၊ စက်ဘီးကို တန်ဖိုးရှိစေဖို့ပါ။ စက်ဘီး ရရှိနိုင်မှုက အလှူအပေါ် မူတည်တယ်၊ သောကြာ ဖွင့်ချိန် ပြောင်းနိုင်လို့ (260) 444-2901 ကို ကြိုဖုန်းဆက်ပါ။",
  },
  "free-vouchers": {
    title: "အခမဲ့ ဗောက်ချာများ ရယူနည်း (ဓာတ်ဆီ၊ အစားအစာနှင့် အခြား)",
    intro: "Fort Wayne မှာ အခမဲ့ အစားအစာ၊ အဝတ်အစား၊ ဘတ်စ်စီးခ၊ စတာတွေအတွက် ဗောက်ချာနဲ့ လက်ဆောင်ကတ် ပေးတဲ့ တကယ့် နေရာများ။ အောက်က အားလုံး အတည်ပြုပြီးသား — ဒါပေမယ့် ဗောက်ချာ ရန်ပုံငွေ မြန်မြန် ကုန်တတ်လို့ ကြိုဖုန်းဆက်ပြီး လအစောပိုင်းမှာ မေးပါ။",
    bring: [
      "ဓာတ်ပုံပါ ID နဲ့ လိပ်စာ သက်သေစာ (နေရာ အများစု တောင်းပါတယ်)",
      "မကြာသေးခင် ထောင် ဒါမှမဟုတ် အကျဉ်းထောင်က လွတ်လာရင်: လွတ်မြောက်စာ ယူလာပါ (Salvation Army အဝတ်အစား ဗောက်ချာအတွက် လိုပါတယ်)",
    ],
    steps: [
      "St. Vincent de Paul (1600 S Calhoun St): သူတို့ thrift ဆိုင်မှာ လဲလှယ်နိုင်တဲ့ အခမဲ့ အဝတ်အစားနဲ့ ပရိဘောဂ ဗောက်ချာ — ဆိုင်မှာ မေးပါ ဒါမှမဟုတ် ဒေသခံ SVdP parish conference ကို ဆက်သွယ်ပါ။ SVdP စေတနာ့ဝန်ထမ်းတွေက Northeast Indiana တစ်ဝန်း နေရာ ၂၂ ခုကနေ Community Harvest Food Bank အစားအစာ ဗောက်ချာနဲ့ လိုအပ်သလို ဈေးဆိုင် လက်ဆောင်ကတ်လည်း ပေးပါတယ်။",
      "Salvation Army (2901 N Clinton St, (260) 744-2311): အလုပ်၊ ဆေးခန်း၊ ဒါမှမဟုတ် အလုပ်ရှာဖွေရေးအတွက် တနင်္လာ/ဗုဒ္ဓဟူး/သောကြာ ဘတ်စ်လက်မှတ် ပေးတယ် — တစ်လကို အကန့်အသတ် ရှိလို့ စောစော မေးပါ။ မကြာသေးခင် လွတ်မြောက်လာသူ (ID + လွတ်မြောက်စာ လိုပါတယ်) ဒါမှမဟုတ် အရေးပေါ် အခြေအနေရှိသူတွေအတွက် အဝတ်အစား ဗောက်ချာ (တစ်ဦးချင်း ဆုံးဖြတ်တယ်)။",
      "Associated Churches (602 E Wayne St): Meijer Simply Give ပူးပေါင်းမှုကနေ သူတို့ရဲ့ ဘုရားကျောင်း ၁၃၀ ကွန်ရက်က လိုအပ်နေတဲ့ မိသားစုတွေကို ဈေးဝယ် လက်ဆောင်ကတ် ဖြန့်ဝေတယ် — အစားအစာ ဘဏ်မှာ မေးပါ။",
      "HEAL Farm Markets: နွေရာသီတိုင်း Fort Wayne ဈေး ၃ ခုမှာ SNAP၊ WIC၊ Senior သီးနှံ ဗောက်ချာ နှစ်ဆ ဖြစ်တယ် (ဗောက်ချာ $1 က လတ်ဆတ်တဲ့ သီးနှံ $2 ဝယ်နိုင်တယ်)။ ၂၀၂၆ ရာသီ စက်တင်ဘာအစောပိုင်းမှာ ပြီးဆုံးသွားပြီ — ၂၀၂၇ ရက်စွဲတွေအတွက် (425) 213-7516 ကို ဖုန်းဆက်ပါ ဒါမှမဟုတ် sjchf.org ကြည့်ပါ။",
      "ဓာတ်ဆီ ဗောက်ချာ: Fort Wayne မှာ တစ်နှစ်ပတ်လုံး အခမဲ့ ဓာတ်ဆီ ဗောက်ချာ ကြေညာတဲ့ အစီအစဉ် မရှိဘူး။ အကောင်းဆုံး အခွင့်အရေးက 211 ဒါမှမဟုတ် Salvation Army ကို (260) 744-2311 ဖုန်းဆက်ပြီး လက်ရှိ ခရီးသွား ဒါမှမဟုတ် ဓာတ်ဆီ အကူအညီ ရန်ပုံငွေ မေးတာ — ဒါတွေ လတိုင်း ပြောင်းပြီး မြန်မြန် ကုန်တယ်။ Salvation Army က လျှပ်စစ်/ဓာတ်ငွေ့ ဘေလ် (လောင်စာမဟုတ်) အတွက်လည်း ရန်ပုံငွေ ရှိရင် ရက်ချိန်းနဲ့ ကူညီနိုင်တယ် — အရင် township trustee ဆီက ပယ်ချစာ လိုပါတယ်။",
    ],
    tips: "ဗောက်ချာ ငွေ နေရာတိုင်း အကန့်အသတ် ရှိတယ် — လအစက မေးဖို့ အကောင်းဆုံး အချိန်ပါ။ မသွားခင် အမြဲ ဖုန်းဆက်ပါ၊ ဘာလိုတယ်ဆိုတာ ပြောပါ (ဓာတ်ဆီ၊ ဘတ်စ်လက်မှတ်၊ အဝတ်၊ အစားအစာ)၊ သူတို့ မှန်ကန်တဲ့ ရန်ပုံငွေ ညွှန်ပြပေးမှာပါ။",
  },
};




/* === version.js === */
window.HAVEN_VER="1.0.3663";window.HAVEN_CODE=3663;



