function foo() {
    const a = 1 + 1;
    console.log(a);
}

const mockFetch = async () => {
    return new Promise( (res) => {
        setTimeout( () => res("foo"), 1000);
    })
};

async function serverAction() {
    "user server";
    const bar = await mockFetch();
    console.log(bar);
}