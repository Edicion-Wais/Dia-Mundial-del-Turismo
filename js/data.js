/* Contenido de la web: categorías y sitios/íconos del Táchira.
   Cada sitio busca su foto en img/<id>.jpg. Si la foto no existe,
   la tarjeta muestra el fondo ilustrado de su categoría. */

window.CATEGORIAS = [
  { id: 'naturaleza', nombre: 'Naturaleza', titulo: 'Fauna y flora andina' },
  { id: 'lugares', nombre: 'Lugares', titulo: 'Lugares y monumentos' },
  { id: 'fe', nombre: 'Fe', titulo: 'Fe y devoción' },
  { id: 'orgullo', nombre: 'Orgullo', titulo: 'Orgullo tachirense' },
  { id: 'tradicion', nombre: 'Tradición', titulo: 'Sabores y oficios' }
];

window.SITIOS = [
  /* ---------- NATURALEZA ---------- */
  {
    id: 'pauji-copete-de-piedra', cat: 'naturaleza',
    nombre: 'Paují Copete de Piedra', lugar: 'Selvas nubladas andinas',
    corto: 'Un ave enorme y escurridiza que lleva sobre la frente un casco gris azulado parecido a una piedra.',
    largo: [
      'El paují copete de piedra (Pauxi pauxi) es una de las aves más llamativas de los Andes venezolanos. Su plumaje negro brillante contrasta con el pico rojo y con el curioso “copete”, una protuberancia ósea de color gris azulado que parece una piedra pulida.',
      'Vive en las selvas nubladas de la cordillera, entre Venezuela y Colombia, donde camina por el suelo del bosque buscando frutos y semillas. En el Táchira encuentra refugio en las montañas protegidas del suroeste del estado.',
      'Hoy es una especie amenazada por la cacería y la pérdida de bosques. Verlo en libertad es un privilegio que recuerda la importancia de cuidar los bosques de niebla tachirenses.'
    ]
  },
  {
    id: 'tucusito', cat: 'naturaleza',
    nombre: 'Tucusito', lugar: 'Jardines, cafetales y páramos',
    corto: 'Así llamamos en Venezuela a los colibríes: pequeñas joyas voladoras que polinizan las flores andinas.',
    largo: [
      '“Tucusito” es el nombre cariñoso que los venezolanos dan a los colibríes. En las montañas del Táchira viven numerosas especies, desde los bosques cálidos del piedemonte hasta los páramos, donde algunas resisten el frío de la altura.',
      'Baten sus alas decenas de veces por segundo, pueden volar hacia atrás y quedarse suspendidos frente a una flor mientras beben su néctar. Al hacerlo transportan polen y ayudan a que florezcan los bosques, los jardines y los cafetales.',
      'Su visita fugaz es parte de la vida cotidiana del tachirense: aparecen en los patios de las casas de campo, en los bebederos de las posadas y en los jardines de los pueblos de montaña.'
    ]
  },
  {
    id: 'pato-de-torrentes', cat: 'naturaleza',
    nombre: 'Pato de Torrentes', lugar: 'Ríos de montaña',
    corto: 'Uno de los pocos patos del mundo que vive en los rápidos de los ríos andinos.',
    largo: [
      'El pato de torrentes (Merganetta armata) es un especialista de las aguas bravas. Mientras otros patos prefieren lagunas tranquilas, él nada contra la corriente de los ríos de montaña, se zambulle entre los rápidos y descansa sobre las rocas mojadas.',
      'El macho luce una cabeza blanca con finas rayas negras; la hembra tiene el pecho color canela. Sus patas fuertes y su cola rígida le permiten mantenerse firme donde el agua corre con más fuerza.',
      'Su presencia es un indicador de ríos limpios y bien conservados, por eso encontrarlo en las quebradas tachirenses es una buena noticia para toda la montaña.'
    ]
  },
  {
    id: 'toche', cat: 'naturaleza',
    nombre: 'Toche', lugar: 'Turpial montañero',
    corto: 'Pariente del turpial, de amarillo intenso y negro, cuyo canto acompaña los amaneceres de los cafetales.',
    largo: [
      'En los Andes se le llama toche a este turpial de montaña de plumaje amarillo dorado con alas, garganta y cola negras. Es primo cercano del turpial, el ave nacional de Venezuela.',
      'Frecuenta los bordes de bosque, los cafetales y los árboles frutales de las fincas, donde teje nidos colgantes en forma de bolsa. Su canto, aflautado y melodioso, es uno de los sonidos más reconocibles del campo tachirense.',
      'Por su belleza y su canto se ha ganado un lugar en la memoria popular andina, en coplas, pinturas y artesanías.'
    ]
  },
  {
    id: 'guacharaca', cat: 'naturaleza',
    nombre: 'Guacharaca', lugar: 'Ave emblemática del Táchira',
    corto: 'Ave emblemática del estado, famosa por su canto ruidoso que anuncia el amanecer.',
    largo: [
      'La guacharaca (Ortalis ruficauda) es reconocida como el ave emblemática del estado Táchira. Es un ave grande, de cola larga con puntas rojizas, que se mueve en grupos entre los árboles de montes y quebradas.',
      'Su nombre imita su canto: al amanecer y al atardecer las parejas entonan en coro un sonoro “gua-cha-ra-ca” que se escucha a gran distancia y que muchos campesinos usan como reloj natural.',
      'Junto al pino laso, el árbol emblemático, y la rosa clavellina, la flor emblemática, forma parte de los símbolos naturales que identifican al Táchira.'
    ]
  },
  {
    id: 'querrequerre', cat: 'naturaleza',
    nombre: 'Querrequerre', lugar: 'Bosques de montaña',
    corto: 'Un ave de colores imposibles —verde, azul y amarillo— con un nombre que imita su propio canto.',
    largo: [
      'El querrequerre (Cyanocorax yncas) es una especie de urraca de los bosques andinos que parece pintada a mano: dorso verde, cabeza azul y blanca, antifaz negro y cola amarilla.',
      'Es inteligente, curioso y muy bullicioso. Su llamado repetido, “querre-querre”, le dio su nombre popular. Vive en grupos familiares que recorren el bosque en busca de insectos y frutos.',
      'En el Táchira es tan querido que el municipio Andrés Bello (Cordero) lo adoptó como su ave emblemática.'
    ]
  },
  {
    id: 'oso-frontino', cat: 'naturaleza',
    nombre: 'Oso Frontino', lugar: 'Páramos y bosques nublados',
    corto: 'El único oso de Suramérica, con las manchas claras del rostro que le dan aire de llevar anteojos.',
    largo: [
      'El oso frontino u oso andino (Tremarctos ornatus) es el único oso que vive en Suramérica. Su pelaje es negro y en el rostro tiene manchas claras alrededor de los ojos, por eso también se le conoce como oso de anteojos.',
      'Habita los bosques nublados y los páramos de la cordillera, donde se alimenta sobre todo de bromelias, frutos y brotes. Es tímido y solitario, y suele evitar al ser humano.',
      'Es una especie vulnerable. Los parques nacionales y páramos del Táchira son parte de su territorio, y protegerlo significa proteger también el agua que nace en esas montañas.'
    ]
  },
  {
    id: 'venado-de-montana', cat: 'naturaleza',
    nombre: 'Venado de Montaña', lugar: 'Bosques altoandinos',
    corto: 'Un pequeño venado de pelaje rojizo, esquivo y silencioso, que habita los bosques altos de la cordillera.',
    largo: [
      'El venado de montaña de los Andes venezolanos, conocido también como venado matacán andino, es un ciervo pequeño de pelaje castaño rojizo y astas cortas y rectas.',
      'Vive en los bosques nublados y en los bordes del páramo, donde se mueve con sigilo entre la vegetación. Es más activo al anochecer y al amanecer, por lo que verlo es una verdadera fortuna.',
      'Durante siglos ha formado parte de los relatos campesinos de la montaña tachirense, y hoy es un símbolo de la fauna que debemos conservar.'
    ]
  },
  {
    id: 'orquidea-angel-de-la-montana', cat: 'naturaleza',
    nombre: 'Orquídea Ángel de la Montaña', lugar: 'Municipio Andrés Bello',
    corto: 'Flor emblemática del municipio Andrés Bello y una de las joyas entre las orquídeas tachirenses.',
    largo: [
      'El Táchira es tierra de orquídeas: se estima que en sus montañas crecen alrededor de un centenar de especies, muchas de ellas en los bosques húmedos de la cordillera.',
      'Entre ellas destaca la orquídea conocida como “Ángel de la Montaña”, proclamada flor emblemática del municipio Andrés Bello (Cordero), junto al querrequerre como ave y al bucare como árbol.',
      'Su nombre evoca la delicadeza de sus flores y el paisaje de niebla donde crece, y es motivo de orgullo para los orquideólogos y cultivadores de la región.'
    ]
  },
  {
    id: 'cafeto-tachirense', cat: 'naturaleza',
    nombre: 'Cafeto Tachirense', lugar: 'Montañas cafetaleras',
    corto: 'El café transformó al Táchira en el siglo XIX y sigue siendo parte del alma de sus montañas.',
    largo: [
      'Pocas plantas han marcado tanto la historia del Táchira como el cafeto. En la segunda mitad del siglo XIX el estado se convirtió en una de las principales regiones cafetaleras de Venezuela.',
      'Los sacos de café bajaban de las montañas en recuas de mulas y luego por tren y por río hasta el Lago de Maracaibo, desde donde salían hacia Europa y Estados Unidos. Ese comercio atrajo casas comerciales extranjeras y dio vida a ciudades, haciendas y caminos.',
      'Hoy la mata de café, con sus granos rojos maduros, sigue presente en las fincas familiares y en cada taza colada que se ofrece al visitante como gesto de bienvenida.'
    ]
  },

  /* ---------- LUGARES Y MONUMENTOS ---------- */
  {
    id: 'basilica-san-cristobal', cat: 'lugares',
    nombre: 'Catedral de San Cristóbal', lugar: 'San Cristóbal',
    corto: 'El gran templo de la capital tachirense, frente a la plaza donde nació la ciudad en 1561.',
    largo: [
      'San Cristóbal fue fundada el 31 de marzo de 1561 por el capitán Juan Maldonado. Frente a la plaza que hoy lleva su nombre se levanta su templo mayor, la Catedral de San Cristóbal, corazón religioso de la ciudad.',
      'Es la sede de la Diócesis de San Cristóbal, creada en 1922. Su fachada blanca, sus torres y su campanario son una de las imágenes más reconocibles del casco histórico.',
      'En su interior, los vitrales narran capítulos de la historia local: la fundación de la ciudad, el paso de Simón Bolívar por San Cristóbal en 1813 y el traslado de la imagen de Nuestra Señora de la Consolación.'
    ]
  },
  {
    id: 'peribeca', cat: 'lugares',
    nombre: 'Pueblo de Peribeca', lugar: 'Municipio Independencia',
    corto: 'Un pueblito de calles empedradas, faroles y casas de tejas, a media hora de San Cristóbal.',
    largo: [
      'Peribeca es una pequeña aldea del municipio Independencia, a unos tres kilómetros y medio de Capacho Nuevo y a unos 1.000 metros sobre el nivel del mar. Sus orígenes se remontan a comienzos del siglo XVII.',
      'Su portada de entrada recibe al visitante con un paisaje de postal: calles empedradas, faroles, casas de bahareque con techos de teja y una iglesia con fachada de piedra dedicada a la Virgen del Carmen, frente a una plaza muy cuidada.',
      'Los fines de semana se llena de visitantes que llegan por sus artesanías, sus dulces y sus pastelitos andinos. Es parada obligada de la ruta turística de los Páramos Mágicos de Capacho.'
    ]
  },
  {
    id: 'chorro-el-indio', cat: 'lugares',
    nombre: 'El Chorro del Indio', lugar: 'Parque Nacional, San Cristóbal',
    corto: 'Una cascada entre bosques nublados que da nombre a un parque nacional a minutos de la capital.',
    largo: [
      'El Chorro El Indio es la cascada que da nombre al Parque Nacional Chorro El Indio, decretado el 7 de diciembre de 1989. Protege unas 17.000 hectáreas de montaña al este de San Cristóbal, entre los 1.100 y los 2.600 metros de altitud.',
      'Sus bosques nublados y páramos son una fuente de agua vital para la ciudad, y sus senderos permiten llegar a la caída de agua entre helechos, musgos y orquídeas.',
      'Una leyenda local cuenta que el hijo de un cacique se enamoró de la hija de un cacique rival. Cuando el padre de la joven descubrió el romance, mató al muchacho, y ella lloró tanto que sus lágrimas formaron la cascada.'
    ]
  },
  {
    id: 'pozos-de-lobatera', cat: 'lugares',
    nombre: 'Pozos de Lobatera', lugar: 'Las Minas, Lobatera',
    corto: 'Piscinas naturales talladas en la roca, de agua azul que se tiñe de rojo al moverse.',
    largo: [
      'A pocos minutos del pueblo de Lobatera, en el sector Las Minas, el agua ha esculpido en la roca una serie de pozas que parecen jacuzzis naturales.',
      'Su color es su mayor sorpresa: en calma, el agua luce un azul intenso; al agitarse, se vuelve rojiza por los minerales de la zona, antigua región de minas de carbón. El sendero sigue entre pequeñas caídas de agua hasta una cascada de unos 50 metros.',
      'Lobatera, fundada a finales del siglo XVI, es uno de los pueblos más antiguos del Táchira. Hoy la ruta de las Minas de Carbón y Piletas de Lobatera es uno de los paseos de aventura favoritos de la región.'
    ]
  },
  {
    id: 'puente-simon-bolivar', cat: 'lugares',
    nombre: 'Puente Internacional Simón Bolívar', lugar: 'San Antonio del Táchira',
    corto: 'El puente que une a Venezuela y Colombia sobre el río Táchira, uno de los pasos fronterizos más transitados del continente.',
    largo: [
      'El Puente Internacional Simón Bolívar une San Antonio del Táchira, en Venezuela, con Villa del Rosario, muy cerca de Cúcuta, en Colombia. La estructura actual, de unos 315 metros de largo, se terminó en 1962 y reemplazó a un puente más angosto de principios del siglo XX.',
      'Por él han pasado durante décadas el comercio, las familias y la vida compartida de dos pueblos hermanos. Llegó a ser uno de los pasos fronterizos más transitados de Latinoamérica.',
      'Tras años de cierre, fue reabierto en 2022. Para el tachirense es mucho más que una obra de ingeniería: es el símbolo de una frontera viva y de una identidad binacional.'
    ]
  },
  {
    id: 'obelisco-de-los-italianos', cat: 'lugares',
    nombre: 'Obelisco de los Italianos', lugar: 'Av. 19 de Abril, San Cristóbal',
    corto: 'El regalo de la comunidad italiana a San Cristóbal, convertido en el gran punto de encuentro de la ciudad.',
    largo: [
      'El Obelisco de los Italianos fue donado por la colectividad italiana del Táchira e inaugurado en enero de 1968, durante la Feria de San Sebastián, como agradecimiento a la tierra que los recibió.',
      'Se levanta en una amplia redoma de la avenida 19 de Abril, en una de las zonas altas de San Cristóbal. Fue declarado patrimonio cultural de la ciudad y del estado en 1997.',
      'Con los años se ha convertido en el gran punto de encuentro de los sancristobalenses: allí se celebran los triunfos del Deportivo Táchira y se reúne la ciudad en sus momentos más importantes.'
    ]
  },
  {
    id: 'estatua-ecuestre-bolivar', cat: 'lugares',
    nombre: 'Estatua Ecuestre de Simón Bolívar', lugar: 'Plaza Bolívar, San Cristóbal',
    corto: 'El primer bronce ecuestre del Táchira, pagado con el aporte de los propios sancristobalenses.',
    largo: [
      'En el centro de la Plaza Bolívar de San Cristóbal se alza el Libertador a caballo, una escultura en bronce de tamaño heroico que fue la primera estatua ecuestre erigida en el Táchira.',
      'Fue adquirida por suscripción popular de los habitantes de la ciudad, con el apoyo del gobierno regional. Su pedestal de formas neoclásicas lleva una dedicatoria del gobierno y de los hijos del Táchira a Simón Bolívar.',
      'El monumento recuerda el vínculo del Libertador con esta tierra: en 1813 pasó por San Cristóbal al inicio de la Campaña Admirable, que lo llevaría hasta Caracas.'
    ]
  },
  {
    id: 'leones-de-capacho', cat: 'lugares',
    nombre: 'Leones del Mercado de Capacho', lugar: 'Capacho Nuevo, Independencia',
    corto: 'Dos leones traídos de Francia custodian un mercado centenario inspirado en las estaciones de tren europeas.',
    largo: [
      'El Mercado Municipal de Capacho Nuevo se construyó entre 1906 y 1907, durante el gobierno de Cipriano Castro, nacido en Capacho. Su arquitectura se inspiró en las estaciones de ferrocarril francesas de finales del siglo XIX.',
      'En el mismo lugar, entonces un descampado donde se hacía el mercado dominical, Castro había leído el 24 de mayo de 1899 la proclama con la que inició la campaña que lo llevó al poder.',
      'Sus guardianes son dos majestuosos leones fundidos en Francia que ornamentan el edificio desde hace más de un siglo. Junto a ellos, una fuente de 1926 conmemora la Batalla de Carabobo. Hoy los leones son el símbolo más querido de Capacho.'
    ]
  },
  {
    id: 'reloj-de-lobatera', cat: 'lugares',
    nombre: 'Reloj Público de Lobatera', lugar: 'Iglesia parroquial de Lobatera',
    corto: 'El “Big Ben del Táchira”: un reloj de torre estadounidense que comenzó a marcar la hora en 1913.',
    largo: [
      'En la torre sur de la iglesia parroquial de Lobatera se encuentra un reloj de torre fabricado por la casa E. Howard & Co., de Estados Unidos, con un mecanismo similar al del famoso Big Ben de Londres.',
      'Fue donado por un vecino interesado en el progreso del pueblo y se puso en marcha el 18 de noviembre de 1913, día de la fiesta de Nuestra Señora. Su llegada se celebró con la banda de música reunida en la plaza.',
      'La sincronización estuvo a cargo de Casiano Rosales, músico, ebanista y relojero. Hoy es patrimonio cultural y un orgullo de los lobaterenses, que sueñan con volver a oírlo marcar las horas.'
    ]
  },
  {
    id: 'piedra-del-mapa', cat: 'lugares',
    nombre: 'Piedra del Mapa', lugar: 'San Juan de Colón, Ayacucho',
    corto: 'Un petroglifo milenario: la huella tallada en piedra de los primeros pobladores del Táchira.',
    largo: [
      'La Piedra del Mapa es el petroglifo más documentado del Táchira. Se encuentra en San Juan de Colón, capital del municipio Ayacucho, que reúne más de la mitad de los petroglifos del estado.',
      'Es un gran bloque de unos 3,78 metros de largo por 1,80 de alto, con figuras grabadas que los investigadores relacionan con el poder y el chamanismo de los pueblos indígenas que habitaron estas tierras antes de la llegada de los españoles.',
      'Su primera fotografía conocida data de comienzos del siglo XX. Hoy se conserva dentro de una escuela del pueblo y la tradición oral la mantiene viva como un mito que los colonenses sienten como propio.'
    ]
  },
  {
    id: 'glamping-de-montana', cat: 'lugares',
    nombre: 'Glamping de Montaña', lugar: 'Páramos y bosques de niebla',
    corto: 'Dormir entre nubes y estrellas: la nueva forma de vivir la montaña tachirense.',
    largo: [
      'El glamping —la unión de “glamour” y “camping”— ha llegado a las montañas del Táchira con domos, cabañas y tiendas equipadas en medio del paisaje andino.',
      'Despertar sobre las nubes, ver el amanecer desde un páramo o dormir bajo un cielo lleno de estrellas son experiencias que hoy atraen a viajeros de todo el país, sin renunciar a la comodidad.',
      'Esta forma de turismo de naturaleza se suma a rutas como la de los Páramos Mágicos de Capacho y abre nuevas oportunidades para las comunidades rurales que reciben al visitante.'
    ]
  },

  /* ---------- FE Y DEVOCIÓN ---------- */
  {
    id: 'virgen-de-la-consolacion', cat: 'fe',
    nombre: 'Virgen de la Consolación de Táriba', lugar: 'Basílica de Táriba',
    corto: 'La patrona del Táchira, cuya imagen renovada hacia el año 1600 reúne cada 15 de agosto a miles de fieles.',
    largo: [
      'Nuestra Señora de la Consolación de Táriba es la patrona del estado Táchira. Su imagen, según la tradición, llegó con los misioneros agustinos y cruzó el río Torbes hasta el lugar donde hoy se levanta Táriba.',
      'La crónica cuenta que el 15 de agosto de 1600 la imagen, ya borrosa por el tiempo, se renovó milagrosamente y volvió a verse con toda su belleza. Desde entonces se le atribuyen numerosos favores, entre ellos el fin de una epidemia que azotó a San Cristóbal en el siglo XVII.',
      'Su santuario fue elevado a Basílica Menor en 1959 por el papa Juan XXIII. Cada 15 de agosto, miles de peregrinos llegan a Táriba para honrar a “la Consoladora”.'
    ]
  },
  {
    id: 'santo-cristo-de-la-grita', cat: 'fe',
    nombre: 'Santo Cristo de La Grita', lugar: 'La Grita, municipio Jáuregui',
    corto: 'El Cristo del Rostro Sereno, tallado tras el terremoto de 1610 y venerado cada 6 de agosto.',
    largo: [
      'En 1610 un fuerte terremoto sacudió La Grita. Según la tradición, fray Francisco, un religioso franciscano, prometió tallar una imagen de Cristo crucificado para proteger a la ciudad, y comenzó a trabajar sobre un tronco de cedro.',
      'Cuenta la leyenda que el fraile no lograba dar al rostro la expresión que buscaba, hasta que una mañana encontró la obra terminada: un Cristo de rostro sereno que, según la fe popular, fue concluido por los ángeles.',
      'La imagen se venera en la Basílica del Espíritu Santo y fue declarada Monumento Nacional en 2010. Cada 6 de agosto, miles de peregrinos llegan a La Grita, considerada el centro espiritual de los Andes venezolanos.'
    ]
  },

  /* ---------- ORGULLO TACHIRENSE ---------- */
  {
    id: 'vuelta-al-tachira', cat: 'orgullo',
    nombre: 'Ciclista de la Vuelta al Táchira', lugar: 'Cada enero desde 1966',
    corto: 'La gran fiesta del ciclismo venezolano, que cada enero lleva el pelotón por las montañas andinas.',
    largo: [
      'La Vuelta al Táchira en Bicicleta nació en 1966 gracias al empeño del profesor Lucidio Martínez, el bombero Pedro Maximino Pérez y el médico Roberto Trujillo. Aquella primera edición tuvo solo cinco etapas.',
      'La ganó el colombiano Martín Emilio “Cochise” Rodríguez, y desde entonces se corre cada enero. Su campeón más laureado es el venezolano José Rujano, con cuatro títulos.',
      'Hoy forma parte del circuito internacional UCI America Tour. Sus etapas de montaña, sus puertos y la pasión del público al borde de la carretera la convierten en una de las tradiciones deportivas más queridas del país.'
    ]
  },
  {
    id: 'deportivo-tachira', cat: 'orgullo',
    nombre: 'Deportivo Táchira', lugar: 'Pueblo Nuevo, San Cristóbal',
    corto: 'El “aurinegro”, el equipo que nació grande y lleva el nombre del Táchira por toda América.',
    largo: [
      'El Deportivo Táchira fue fundado el 11 de enero de 1974 en San Cristóbal, por iniciativa de Gaetano Greco y de miembros de la comunidad italiana. Comenzó con otro nombre y ganó su primer torneo en la Feria de San Sebastián.',
      'Al año siguiente debutó como profesional y fue subcampeón de la Copa Venezuela, lo que le valió el apodo de “el equipo que nació grande”. Su primer título nacional llegó en 1979, y desde entonces ha sumado más de diez estrellas.',
      'Es el club venezolano con más participaciones en la Copa Libertadores. Su estadio en Pueblo Nuevo y sus colores amarillo y negro son parte de la identidad de todo un estado.'
    ]
  },
  {
    id: 'ucat', cat: 'orgullo',
    nombre: 'Universidad Católica del Táchira', lugar: 'San Cristóbal',
    corto: 'La primera institución de educación superior del Táchira, nacida en 1962.',
    largo: [
      'La Universidad Católica del Táchira (UCAT) comenzó el 22 de septiembre de 1962 como extensión de la Universidad Católica Andrés Bello, por iniciativa de la Diócesis de San Cristóbal y con el respaldo de la Compañía de Jesús.',
      'Fue la primera institución de educación superior del estado Táchira. En 1982 obtuvo su autonomía como universidad, manteniendo la dirección de los jesuitas y el apoyo de la Diócesis.',
      'En 2012 recibió el reconocimiento canónico del papa Benedicto XVI. Generaciones de profesionales tachirenses se han formado en sus aulas.'
    ]
  },
  {
    id: 'toro-de-la-feria', cat: 'orgullo',
    nombre: 'Toro de las Corridas con Banderines', lugar: 'Feria Internacional de San Sebastián',
    corto: 'Símbolo de la Feria de San Sebastián, la gran fiesta de enero que llena de color a San Cristóbal.',
    largo: [
      'Cada mes de enero San Cristóbal celebra la Feria Internacional de San Sebastián, en honor al patrono de la ciudad. Durante décadas, la temporada taurina en la Plaza Monumental de Pueblo Nuevo fue uno de sus grandes atractivos.',
      'La figura del toro adornado con banderines de colores se convirtió en un emblema de la feria, junto a los desfiles, la música, los conciertos y las exposiciones agropecuarias.',
      'Más allá de las corridas, el toro con banderines representa el espíritu festivo de enero, cuando la ciudad recibe a visitantes de todo el país y de Colombia.'
    ]
  },
  {
    id: 'corona-del-reinado', cat: 'orgullo',
    nombre: 'Corona del Reinado de la Feria', lugar: 'Feria Internacional de San Sebastián',
    corto: 'La corona que distingue a la reina de la feria de San Cristóbal, tradición de cada enero.',
    largo: [
      'El reinado es uno de los momentos más esperados de la Feria Internacional de San Sebastián. Jóvenes candidatas desfilan por la ciudad en carrozas y comparsas antes de la elección de la reina.',
      'La coronación abre oficialmente la temporada de fiesta y la soberana se convierte en embajadora de la feria y de la ciudad.',
      'La corona resume el brillo de una tradición que durante generaciones ha unido a las familias tachirenses alrededor de la música, los desfiles y la alegría de enero.'
    ]
  },

  /* ---------- SABORES Y OFICIOS ---------- */
  {
    id: 'pan-andino', cat: 'tradicion',
    nombre: 'Pan Andino', lugar: 'Panaderías tachirenses',
    corto: 'Acemas, pan de trigo y bizcochos: el Táchira es tierra de panaderías.',
    largo: [
      'El trigo se cultiva en los Andes venezolanos desde la época colonial y con él nació una larga tradición panadera. En el Táchira, la panadería es casi una institución.',
      'Las acemas —pan redondo y aromático, ideal con queso y bocadillo de guayaba—, el pan de leche y los bizcochos acompañan el café de la mañana y de la tarde. Muchas panaderías fueron fundadas por familias de inmigrantes que enriquecieron las recetas locales.',
      'Detenerse en una panadería de pueblo después de recorrer la montaña es uno de los placeres sencillos del viaje por el Táchira.'
    ]
  },
  {
    id: 'pina-hato-de-la-virgen', cat: 'tradicion',
    nombre: 'Piña del Hato de la Virgen', lugar: 'Municipio Libertad (Capacho Viejo)',
    corto: 'De suelos secos y soleados nacen algunas de las piñas más dulces del Táchira.',
    largo: [
      'Hato de la Virgen es una aldea del municipio Libertad, cuya capital es Capacho Viejo. Sus tierras secas y soleadas resultaron ideales para el cultivo de la piña, que se convirtió en su principal producción.',
      'Sus piñas tienen fama de ser de las más dulces del estado. Con ellas, las familias de la zona preparan dulces, jugos y el tradicional guarapo de piña.',
      'La aldea forma parte de la ruta turística de la artesanía y la piña, que invita a recorrer los pueblos de los Capachos y llevarse a casa el sabor de esta fruta.'
    ]
  },
  {
    id: 'taza-de-peltre', cat: 'tradicion',
    nombre: 'Taza de Peltre', lugar: 'Cocinas andinas',
    corto: 'La taza esmaltada del café recién colado en las mañanas frías de la montaña.',
    largo: [
      'En las cocinas de las casas de campo tachirenses nunca falta la taza de peltre: metal esmaltado, generalmente blanco o azul, con su borde oscuro.',
      'En ella se sirve el café recién colado al amanecer, el chocolate caliente o la agüita de panela que calienta el cuerpo en las mañanas frías de la montaña.',
      'Resistente y sencilla, la taza de peltre es símbolo de la hospitalidad andina: ofrecer un “cafecito” al visitante es la primera forma de decirle bienvenido.'
    ]
  },
  {
    id: 'ruana-andina', cat: 'tradicion',
    nombre: 'Ruana Andina', lugar: 'Páramos tachirenses',
    corto: 'El abrigo de lana del campesino andino, tejido para resistir el frío del páramo.',
    largo: [
      'La ruana es una prenda rectangular de lana con una abertura para la cabeza, heredera de las tradiciones textiles indígenas y de la lana traída en tiempos coloniales.',
      'En los páramos y pueblos altos del Táchira, donde el frío y la neblina son compañeros diarios, la ruana protege al campesino en el trabajo, en el camino y en las fiestas.',
      'Tejida en telar y en colores sobrios o vivos, es hoy también una prenda de orgullo regional y uno de los recuerdos más buscados por los visitantes.'
    ]
  },
  {
    id: 'cesta-de-palmira', cat: 'tradicion',
    nombre: 'Cesta Artesanal de Palmira', lugar: 'El Abejal, Guásimos',
    corto: 'Cestas tejidas a mano con caña amarga, un oficio que pasa de padres a hijos.',
    largo: [
      'En la aldea El Abejal de Palmira, en el municipio Guásimos, la cestería es el sustento y el orgullo de la comunidad. Es una tradición que se remonta a la época indígena y se ha transmitido de generación en generación.',
      'Las piezas se tejen a mano con caña amarga, conocida como “lata”, y con caña brava. Con el tiempo, artesanos inmigrantes aportaron técnicas como el mimbre, y el oficio se enriqueció con cunas, moisés, floreros y cestas de todos los tamaños.',
      'El corredor artesanal de El Abejal y la pequeña plaza Los Artesanos, con la escultura de una tejedora, invitan al visitante a conocer este oficio de cerca.'
    ]
  },
  {
    id: 'muneca-de-trapo', cat: 'tradicion',
    nombre: 'Muñeca de Trapo Tradicional', lugar: 'Artesanía popular',
    corto: 'Hecha con retazos de tela y mucho cariño, la muñeca de trapo es parte de la infancia andina.',
    largo: [
      'Antes de los juguetes industriales, las madres y abuelas de la montaña cosían muñecas con retazos de tela, relleno de algodón y trenzas de estambre.',
      'Cada muñeca era única: vestidos floreados, delantales, pañoletas y rostros bordados a mano. Se regalaban en Navidad y acompañaban a las niñas durante toda su infancia.',
      'Hoy las artesanas tachirenses mantienen viva esta tradición, que se ha convertido en un recuerdo entrañable para quienes visitan la región.'
    ]
  },
  {
    id: 'sombrero-andino', cat: 'tradicion',
    nombre: 'Sombrero Andino', lugar: 'Campo tachirense',
    corto: 'Compañero inseparable del campesino, protege del sol de altura y de la llovizna.',
    largo: [
      'En el campo tachirense el sombrero es parte de la vestimenta diaria. Protege del intenso sol de la altura y de las lloviznas repentinas de la montaña.',
      'Junto a la ruana y las alpargatas, completa la imagen tradicional del campesino andino que trabaja la tierra, arrea el ganado o baja al pueblo los días de mercado.',
      'Elaborado en fieltro o en fibras naturales por artesanos de la región, es también símbolo de identidad en las danzas, las fiestas patronales y la música andina.'
    ]
  },
  {
    id: 'ceramica-lomas-bajas', cat: 'tradicion',
    nombre: 'Cerámica Tradicional de Lomas Bajas', lugar: 'Municipio Libertad',
    corto: 'Un pueblo de alfareros donde el barro se convierte en ollas, materos y vasijas hechas a mano.',
    largo: [
      'Lomas Bajas, en el municipio Libertad, es uno de los pueblos alfareros más importantes de Venezuela. En la carretera es común ver vasijas, tazas, platos y materos a la venta frente a las casas.',
      'El oficio se transmite en familia, de abuelas a madres e hijas y de padres a hijos. Algunos maestros todavía modelan las ollas totalmente a mano, sin torno, como lo hacían sus antepasados.',
      'Sus piezas de barro llegan a los mercados de San Cristóbal y a los hogares de toda la región, llevando consigo una tradición de siglos.'
    ]
  },
  {
    id: 'bandolin-andino', cat: 'tradicion',
    nombre: 'Bandolín Andino', lugar: 'Música andina venezolana',
    corto: 'Sus cuerdas metálicas dan voz a los pasillos, valses y bambucos de la montaña.',
    largo: [
      'El bandolín es un instrumento de cuerdas metálicas, de la familia de la bandola y la mandolina, que ocupa un lugar central en la música andina venezolana.',
      'Su sonido brillante lleva la melodía de pasillos, valses, bambucos y danzas, acompañado por la guitarra, el tiple o el cuatro en las estudiantinas y conjuntos típicos.',
      'En serenatas, fiestas patronales y encuentros familiares del Táchira, el bandolín sigue siendo la voz de la nostalgia y la alegría de la montaña.'
    ]
  },
  {
    id: 'farol-colonial', cat: 'tradicion',
    nombre: 'Farol Colonial', lugar: 'Pueblos de tradición colonial',
    corto: 'La luz cálida que ilumina las calles empedradas de los pueblos tachirenses.',
    largo: [
      'Los faroles de hierro y vidrio recuerdan los tiempos en que las calles se iluminaban con velas y lámparas de aceite.',
      'Hoy adornan las fachadas y esquinas de pueblos como Peribeca, La Grita, Lobatera o San Pedro del Río, donde las casas de tejas, los balcones de madera y las calles empedradas conservan el encanto de otra época.',
      'Al caer la tarde, su luz cálida transforma el paisaje y convierte cada caminata por el casco histórico en un viaje en el tiempo.'
    ]
  }
];
