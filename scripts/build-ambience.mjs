import { writeFile } from 'node:fs/promises';

const sampleRate = 22050;
const seconds = 24;
const samples = sampleRate * seconds;
const frequencies = [174.625, 220, 261.625, 329.625];
const wav = Buffer.alloc(44 + samples * 2);
wav.write('RIFF', 0);
wav.writeUInt32LE(wav.length - 8, 4);
wav.write('WAVEfmt ', 8);
wav.writeUInt32LE(16, 16);
wav.writeUInt16LE(1, 20);
wav.writeUInt16LE(1, 22);
wav.writeUInt32LE(sampleRate, 24);
wav.writeUInt32LE(sampleRate * 2, 28);
wav.writeUInt16LE(2, 32);
wav.writeUInt16LE(16, 34);
wav.write('data', 36);
wav.writeUInt32LE(samples * 2, 40);
for (let index = 0; index < samples; index++) {
  const time = index / sampleRate;
  const sample = frequencies.reduce((sum, frequency, voice) => {
    const breath = .07 + .025 * Math.sin(2 * Math.PI * time / seconds + voice);
    const phase = 2 * Math.PI * frequency * time + voice * .7;
    return sum + breath * (Math.sin(phase) + .12 * Math.sin(phase * 2));
  }, 0);
  wav.writeInt16LE(Math.round(sample * .8 * 32767), 44 + index * 2);
}
await writeFile(new URL('../assets/studio-ambience.wav', import.meta.url), wav);
console.log(`Built an original ${seconds}-second ambient loop (${wav.length} bytes).`);
