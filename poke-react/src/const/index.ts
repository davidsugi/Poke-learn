const INITIAL_POKEMON = [
    1,
    4,
    7,
    152,
    155,
    158,
    // 252,
    // 255,
    // 258,
    // 387,
    // 390,
    // 393,
    // 495,
    // 498,
    // 501,
    // 650,
    // 653,
    // 656,
    // 722,
    // 725,
    // 728,
    // 810,
    // 813,
    // 816,
    // 906,
    // 909,
    // 912
]

export const POKEMON_IMG_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
export const INITIAL_POKEMON_IMG = INITIAL_POKEMON.map((id)=>`${POKEMON_IMG_URL}${id}.png`)