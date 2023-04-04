import path from 'path';
import { promises as fs } from 'fs';
import { Record } from '@/types';

export async function parseDriverData() {
    //Find the absolute path of the json directory
    const jsonDirectory = path.join(process.cwd(), 'json');
    //Read the json data file data.json
    const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8');

    const data = JSON.parse(fileContents);
    // parse the data into an array of record objects
    const records: Array<Record>= [];
    for(var element of data){
        for(var record of element["data"]){
            records.push(record);
        }
    }

    return records;
}

export default {
    parseDriverData
}