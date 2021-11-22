let port, reader, writer;

async function setup() {

	createCanvas(windowWidth, windowHeight);
	noLoop();
	({ port, reader, writer } = await getPort());
	loop();
}



async function draw() {
	try {
		while (true) {
			const { value, done } = await reader.read();

			if (done) {
				// Allow the serial port to be closed later.
				reader.releaseLock();
				break;
			}
			if (value) {
        const array = value.split(';')
        background(color("white"));
        textSize(50);
				text(`Humidity = ${array[0]}%`,20,40);
        text(`Temperature = ${array[1]}°C`,20,90);
        text(`Humidity status = ${array[2]}`,20,140);
        text(`Temperature status = ${array[3]}`,20,190);

				console.log(value);
        console.log(array);
			}
		}
	} catch (e) { console.error(e) }
}
