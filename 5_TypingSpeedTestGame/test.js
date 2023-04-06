function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

for (let i = 0; i < 20; i++) {
    console.log(
        Math.floor(getRandomArbitrary(1,11))
    );    
}