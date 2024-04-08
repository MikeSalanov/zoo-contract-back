'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const animalsNames = ['Asian Elephant', 'Green Iguana Blue Morph', 'White Lion', 'Siberian Tiger', 'Giraffe', 'Wallaby', 'Llama', 'Vervet Monkey'];
    const descriptionsAnimals = [
      'The Asian elephant is the largest living land animal in Asia. Since 1986, the Asian elephant has been listed as Endangered on the IUCN Red List, as the population has declined by at least 50 percent over the last three elephant generations, which is about 60–75 years. It is primarily threatened by loss of habitat, habitat degradation, fragmentation and poaching.In 2019, the wild population was estimated at 48,323-51,680 individuals. Female captive elephants have lived beyond 60 years when kept in semi-natural surroundings, such as forest camps. In zoos, Asian elephants die at a much younger age; captive populations are declining due to a low birth and high death rate.',
      'The blue iguana is the largest native land animal on Grand Cayman with a total nose-to-tail length of 5 ft (1.5 m) and weighing as much as 30 lb (14 kg). This is among the largest species of lizard in the Western Hemisphere.',
      'White lions are not albinos. Their white color is caused by a recessive trait, called leucism, derived from a less-severe mutation in the same gene that causes albinism, distinct from the gene responsible for white tigers. They vary from blonde to near-white. This coloration does not appear to pose a disadvantage to their survival. White lions were considered to have been technically extinct in the wild between 1992 and 2004, when the Global White Lion Protection Trust achieved the first successful reintroduction of white lions to their natural habitat. These prides have continued to hunt and breed successfully in the wild, whilst other occurrences of white lion births have been reported in the greater Kruger region since then.',
      'The ground colour of Siberian tigers\' pelage is often very pale, especially in winter coat. However, variations within populations may be considerable. Individual variation is also found in form, length, and partly in colour, of the dark stripes, which have been described as being dark brown rather than black.The fur of the Siberian tiger is moderately thick, coarse and sparse compared to that of other felids living in the former Soviet Union. Compared to the extinct westernmost populations, the Siberian tiger\'s summer and winter coats contrast sharply with other subspecies. Generally, the coat of western populations was brighter and more uniform than that of the Far Eastern populations. The summer coat is coarse, while the winter coat is denser, longer, softer, and silkier. The winter fur often appears quite shaggy on the trunk and is markedly longer on the head, almost covering the ears. Siberian and Caspian tigers had the thickest fur amongst tigers.',
      'To save the remaining 9,000, or so, Reticulated giraffes, several conservation organizations have been formed. One of these organizations is San Diego Zoo Global\'s "Twiga Walinzi" (meaning Giraffe Guards) initiative. Their work includes hiring and training local Kenyans to monitor 120 trail cameras in Northern Kenya (Loisaba Conservancy and Namunyak Wildlife Conservancy) that capture footage of wild giraffes and other Kenyan wildlife; developing a photo ID database so individual giraffes can be tracked; informing rangers of poaching incidents and removing snares; caring for orphaned giraffes; and educating communities about giraffe conservation.',
      'Red-necked wallabies are distinguished by their black nose and paws, white stripe on the upper lip, and grizzled medium grey coat with a reddish wash across the shoulders. They can weigh 13.8 to 18.6 kilograms (30 to 41 lb) and attain a head-body length of 90 centimetres (35 in), although males are generally bigger than females. Red-necked wallabies are very similar in appearance to the black-striped wallaby (Notamacropus dorsalis), the only difference being that red-necked wallabies are larger, lack a black stripe down the back, and have softer fur. Red-necked wallabies may live up to nine years.',
      'Llamas are social animals and live with others as a herd. Their wool is soft and contains only a small amount of lanolin. Llamas can learn simple tasks after a few repetitions. When using a pack, they can carry about 25 to 30% of their body weight for 8 to 13 km (5–8 miles). The name llama (in the past also spelled "lama" or "glama") was adopted by European settlers from native Peruvians.',
      'In addition to behavioral research on natural populations, vervet monkeys serve as a nonhuman primate model for understanding genetic and social behaviors of humans. They have been noted for having human-like characteristics, such as hypertension, anxiety, and social and dependent alcohol use. Vervets live in social groups ranging from 10 to 70 individuals, with males moving to other groups at the time of sexual maturity. Studies done on vervet monkeys involve their communication and alarm calls, specifically in regard to kin and group recognition, and particular predator sightings.'
    ];
    const animalsData = animalsNames.map(((name, i) => ({
      name,
      description: descriptionsAnimals[i],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })));
    return queryInterface.bulkInsert('Animals', animalsData);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
