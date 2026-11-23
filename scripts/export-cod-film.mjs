import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { codFilmScenes } from '../src/cod-film-story.js';
import recorded from '../src/cod-film-audio.json' with { type: 'json' };

if (!process.argv[2]) throw new Error('Provide an absolute output path for the COD film recording plan.');
await writeFile(resolve(process.argv[2]), JSON.stringify({
  profile: 'energetic',
  scenes: codFilmScenes.map(({ id, narration }) => {
    const previous = recorded.scenes.find(clip => clip.id === id && clip.text === narration);
    return { id, text: narration, ...(previous ? { existingFile: previous.file } : {}) };
  })
}, null, 2) + '\n');
