/**
 * Pure Node.js PNG → ICO converter (no external dependencies).
 * Embeds the PNG data directly inside a valid ICO container.
 * Modern ICO spec (Vista+) allows PNG images embedded as-is.
 *
 * Usage: node scripts/png-to-ico.mjs <input.png> <output.ico>
 */
import { readFileSync, writeFileSync } from "fs";

const [, , inputPng, outputIco] = process.argv;

if (!inputPng || !outputIco) {
  console.error("Usage: node scripts/png-to-ico.mjs <input.png> <output.ico>");
  process.exit(1);
}

const pngData = readFileSync(inputPng);
const pngSize = pngData.length;

// ICO format: ICONDIR (6 bytes) + ICONDIRENTRY (16 bytes) + PNG data
// ICONDIR
const iconDir = Buffer.alloc(6);
iconDir.writeUInt16LE(0, 0);      // Reserved (must be 0)
iconDir.writeUInt16LE(1, 2);      // Type: 1 = ICO
iconDir.writeUInt16LE(1, 4);      // Count: 1 image

// ICONDIRENTRY (16 bytes)
const iconDirEntry = Buffer.alloc(16);
iconDirEntry.writeUInt8(0, 0);           // Width: 0 means 256
iconDirEntry.writeUInt8(0, 1);           // Height: 0 means 256
iconDirEntry.writeUInt8(0, 2);           // ColorCount: 0 = no palette
iconDirEntry.writeUInt8(0, 3);           // Reserved
iconDirEntry.writeUInt16LE(1, 4);        // Planes
iconDirEntry.writeUInt16LE(32, 6);       // BitCount: 32bpp
iconDirEntry.writeUInt32LE(pngSize, 8);  // SizeInBytes
iconDirEntry.writeUInt32LE(22, 12);      // Offset: 6 (ICONDIR) + 16 (ICONDIRENTRY)

const icoBuffer = Buffer.concat([iconDir, iconDirEntry, pngData]);
writeFileSync(outputIco, icoBuffer);

console.log(`✅ Created ${outputIco} (${icoBuffer.length} bytes) from ${inputPng}`);
