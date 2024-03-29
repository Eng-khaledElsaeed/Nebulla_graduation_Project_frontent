export function generate(name){
	const randomColor = () => Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
	const bgColor = `#${randomColor()}`;
	const textColor = bgColor === '#ffffff' ? '#000000' : '#ffffff'; // Ensure contrasting text color
    // get name initials
    const myNames = name.split(" ");
    const initials = myNames.shift().charAt(0) + myNames.pop().charAt(0);
    const nameInitials =initials.toUpperCase();
    // show the hidden div
   	const avatarImage=generateAvatar(
        nameInitials,
        textColor,
        bgColor
	);
	return avatarImage;
}

function generateAvatar(
    text,
    foregroundColor = "white",
    backgroundColor = "black"
) {
    const canvas = document.createElement("canvas");
    //download = document.getElementById("download");
    const context = canvas.getContext("2d");

    canvas.width = 200;
    canvas.height = 200;

    // Draw background
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text
    context.font = "bold 100px Assistant";
    context.fillStyle = foregroundColor;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, canvas.width / 2, canvas.height / 2 );
    //download.href=canvas.toDataURL("image/png");
    return canvas.toDataURL("image/png");

}