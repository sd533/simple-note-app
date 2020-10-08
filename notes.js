const fs=require('fs');
const chalk=require('chalk');

const getNotes=()=>{
    const notes=loadNotes();
    if(notes.length==0){
        console.log(chalk.black.bgRed("no note found."));
    }
    else{
        console.log(chalk.black.bgBlueBright("your notes"));
        notes.forEach((note) => {
            console.log(chalk.black.bgYellowBright(note.title));
        });
    }
}

const addNote=(title,body)=>{
    const notes=loadNotes();
    const duplicate=notes.find((note)=>note.title==title);

    if(!duplicate){
        notes.push({
            title:title,
            body:body
        });
        saveNotes(notes);
        console.log(chalk.black.bgGreen("new note added."));
    }
    else{
        console.log(chalk.white.bgRed("note already taken."));
    }
}

const saveNotes=(notes)=>{
    const notesJSON=JSON.stringify(notes);
    fs.writeFileSync('notes.json',notesJSON);
}

const removeNote=(title)=>{
    const notes=loadNotes();
    const index=notes.findIndex((note)=>note.title==title);
    if(index>-1){
        notes.splice(index,1);
        saveNotes(notes);
        console.log(chalk.black.bgGreen("note deleted."));
    }
    else{
        console.log(chalk.white.bgRed("note not found."));
    }

}

const readNode=(title)=>{
    const notes=loadNotes();
    const index=notes.findIndex((note)=>note.title==title);
    if(index>-1){
        const _title=notes[index].title;
        const _body=notes[index].body;
        console.log(chalk.black.bgCyan(_title)+": "+chalk.black.bgYellow(_body));
    }
    else{
        console.log(chalk.black.bgRed("no note found."));
    }
}

const loadNotes=()=>{
    try{
        const dataBuffer=fs.readFileSync('notes.json');
        const dataJSON=dataBuffer.toString();
        return JSON.parse(dataJSON);
    }catch(e){
        return [];
    }
}


module.exports={
    getNotes:getNotes,
    addNote:addNote,
    removeNote:removeNote,
    readNote:readNode
};