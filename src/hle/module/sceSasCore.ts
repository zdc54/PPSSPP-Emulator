import _utils = require('../utils');
import _context = require('../../context');
import _audio = require('../../core/audio');
import _vag = require('../../format/vag');
import createNativeFunction = _utils.createNativeFunction;
import SceKernelErrors = require('../SceKernelErrors');
import Sample = _audio.Sample;
import VagSoundSource = _vag.VagSoundSource;

var PSP_SAS_VOL_MAX = 0x1000;
var PSP_SAS_PITCH_MIN = 0x1;
var PSP_SAS_PITCH_BASE = 0x1000;
var PSP_SAS_PITCH_MAX = 0x4000;

export class sceSasCore {
	private static PSP_SAS_VOICES_MAX = 32;
	private static PSP_SAS_GRAIN_SAMPLES = 256;
	private static PSP_SAS_LOOP_MODE_OFF = 0;
	private static PSP_SAS_LOOP_MODE_ON = 1;
	private static PSP_SAS_NOISE_FREQ_MAX = 0x3F;
	private static PSP_SAS_ENVELOPE_HEIGHT_MAX = 0x40000000;
	private static PSP_SAS_ENVELOPE_FREQ_MAX = 0x7FFFFFFF;
	private static PSP_SAS_ADSR_ATTACK = 1;
	private static PSP_SAS_ADSR_DECAY = 2;
	private static PSP_SAS_ADSR_SUSTAIN = 4;
	private static PSP_SAS_ADSR_RELEASE = 8;

	private core = new SasCore();

	constructor(private context: _context.EmulatorContext) {
	}

	__sceSasInit = createNativeFunction(0x42778A9F, 150, 'uint', 'int/int/int/int/int', this, (sasCorePointer: number, grainSamples: number, maxVoices: number, outputMode: number, sampleRate: number) => {
		if (sampleRate != 44100) {
			return SceKernelErrors.ERROR_SAS_INVALID_SAMPLE_RATE;
		}

		//CheckGrains(GrainSamples);

		if (maxVoices < 1 || maxVoices > sceSasCore.PSP_SAS_VOICES_MAX) {
			return SceKernelErrors.ERROR_SAS_INVALID_MAX_VOICES;
		}

		if (outputMode != OutputMode.STEREO && outputMode != OutputMode.MULTICHANNEL) {
			return SceKernelErrors.ERROR_SAS_INVALID_OUTPUT_MODE;
		}

		//var SasCore = GetSasCore(SasCorePointer, CreateIfNotExists: true);
		this.core.grainSamples = grainSamples;
		this.core.maxVoices = maxVoices;
		this.core.outputMode = outputMode;
		this.core.sampleRate = sampleRate;
		this.core.initialized = true;

		//BufferTemp = new StereoIntSoundSample[SasCore.GrainSamples * 2];
		//BufferShort = new StereoShortSoundSample[SasCore.GrainSamples * 2];
		//MixBufferShort = new StereoShortSoundSample[SasCore.GrainSamples * 2];
		
		return 0;
	});

	__sceSasSetGrain = createNativeFunction(0xD1E0A01E, 150, 'uint', 'int/int', this, (sasCorePointer: number, grainSamples: number) => {
		this.core.grainSamples = grainSamples;
		return 0;
	});

	__sceSasSetOutputmode = createNativeFunction(0xE855BF76, 150, 'uint', 'int/int', this, (sasCorePointer: number, outputMode: OutputMode) => {
		this.core.outputMode = outputMode;
		return 0;
	});

	__sceSasSetVoice = createNativeFunction(0x99944089, 150, 'uint', 'int/int/byte[]/int', this, (sasCorePointer: number, voiceId: number, data: Stream, loop: number) => {
		var voice = this.getSasCoreVoice(sasCorePointer, voiceId);
		if (data == null) {
			voice.unsetSource();
			return 0;
		}
		if (data.length == 0) throw (new SceKernelException(SceKernelErrors.ERROR_SAS_INVALID_ADPCM_SIZE));
		if (data.length < 0x10) throw (new SceKernelException(SceKernelErrors.ERROR_SAS_INVALID_ADPCM_SIZE));
		if (data.length % 0x10) throw (new SceKernelException(SceKernelErrors.ERROR_SAS_INVALID_ADPCM_SIZE));
		if (data == Stream.INVALID) throw (new SceKernelException(SceKernelErrors.ERROR_SAS_INVALID_VOICE));
		if (loop != 0 && loop != 1) throw (new SceKernelException(SceKernelErrors.ERROR_SAS_INVALID_LOOP_POS));
		if (data == null) {
			voice.unsetSource();
		} else {
			voice.setAdpcm(data, loop);
		}
		return 0;
	});

	__sceSasSetVoicePCM = createNativeFunction(0xE1CD9561, 150, 'uint', 'int/int/byte[]/int', this, (sasCorePointer: number, voiceId: number, data: Stream, loop: number) => {
		var voice = this.getSasCoreVoice(sasCorePointer, voiceId);
		if (data == null) {
			voice.unsetSource();
		} else {
			voice.setPCM(data, loop);
		}
		return 0;
	});

	__sceSasCoreWithMix = createNativeFunction(0x50A14DFC, 150, 'uint', 'int/void*/int/int', this, (sasCorePointer: number, sasOut: Stream, leftVolume: number, rightVolume: number) => {
		return this.core.mix(sasCorePointer, sasOut, leftVolume, rightVolume);
	});

	__sceSasCore = createNativeFunction(0xA3589D81, 150, 'uint', 'int/void*', this, (sasCorePointer: number, sasOut: Stream) => {
		return this.core.mix(sasCorePointer, sasOut, PSP_SAS_VOL_MAX, PSP_SAS_VOL_MAX);
	});

	__sceSasGetEndFlag = createNativeFunction(0x68A46B95, 150, 'uint', 'int', this, (sasCorePointer: number) => {
		return this.core.endFlags;
	});

	__sceSasRevType = createNativeFunction(0x33D4AB37, 150, 'uint', 'int/int', this, (sasCorePointer: number, waveformEffectType: WaveformEffectType) => {
		this.core.waveformEffectType = waveformEffectType;
		return 0;
	});

	__sceSasRevVON = createNativeFunction(0xF983B186, 150, 'uint', 'int/int/int', this, (sasCorePointer: number, waveformEffectIsDry: boolean, waveformEffectIsWet: boolean) => {
		this.core.waveformEffectIsDry = waveformEffectIsDry;
		this.core.waveformEffectIsWet = waveformEffectIsWet;
		return 0;
	});

	__sceSasRevEVOL = createNativeFunction(0xD5A229C9, 150, 'uint', 'int/int/int', this, (sasCorePointer: number, leftVolume: number, rightVolume: number) => {
		this.core.leftVolume = leftVolume;
		this.core.rightVolume = rightVolume;
		return 0;
	});

	private getSasCoreVoice(sasCorePointer: number, voiceId: number) {
		var voice = this.core.voices[voiceId];
		if (!voice) throw (new SceKernelException(SceKernelErrors.ERROR_SAS_INVALID_VOICE));
		return voice;
	}

	__sceSasSetADSR = createNativeFunction(0x019B25EB, 150, 'uint', 'int/int/int/int/int/int/int', this, (sasCorePointer: number, voiceId: number, flags: AdsrFlags, attackRate: number, decayRate: number, sustainRate: number, releaseRate: number) => {
		var voice = this.getSasCoreVoice(sasCorePointer, voiceId);

		if (flags & AdsrFlags.HasAttack) voice.envelope.attackRate = attackRate;
		if (flags & AdsrFlags.HasDecay) voice.envelope.decayRate = decayRate;
		if (flags & AdsrFlags.HasSustain) voice.envelope.sustainRate = sustainRate;
		if (flags & AdsrFlags.HasRelease) voice.envelope.releaseRate = releaseRate;

		return 0;
	});

	__sceSasSetADSRmode = createNativeFunction(0x9EC3676A, 150, 'uint', 'int/int/int/int/int/int/int', this, (sasCorePointer: number, voiceId: number, flags: AdsrFlags, attackCurveMode: AdsrCurveMode, decayCurveMode: AdsrCurveMode, sustainCurveMode: AdsrCurveMode, releaseCurveMode: AdsrCurveMode) => {
		console.warn('__sceSasSetADSRmode not implemented!');
		return 0;
	});

	__sceSasSetKeyOff = createNativeFunction(0xA0CF2FA4, 150, 'uint', 'int/int', this, (sasCorePointer: number, voiceId: number) => {
		var voice = this.getSasCoreVoice(sasCorePointer, voiceId);
		if (!voice.paused) return SceKernelErrors.ERROR_SAS_VOICE_PAUSED;
		voice.setOn(false);
		return 0;
	});

	__sceSasSetKeyOn = createNativeFunction(0x76F01ACA, 150, 'uint', 'int/int', this, (sasCorePointer: number, voiceId: number) => {
		var voice = this.getSasCoreVoice(sasCorePointer, voiceId);
		voice.setOn(true);
		return 0;
	});

	__sceSasGetEnvelopeHeight = createNativeFunction(0x74AE582A, 150, 'uint', 'int/int', this, (sasCorePointer: number, voiceId: number) => {
		var voice = this.getSasCoreVoice(sasCorePointer, voiceId);
		return voice.envelope.height;
	});

	__sceSasSetSL = createNativeFunction(0x5F9529F6, 150, 'uint', 'int/int/int', this, (sasCorePointer: number, voiceId: number, sustainLevel: number) => {
		var voice = this.getSasCoreVoice(sasCorePointer, voiceId);
		voice.sustainLevel = sustainLevel;
		return 0;
	});

	__sceSasSetPause = createNativeFunction(0x787D04D5, 150, 'uint', 'int/int/int', this, (sasCorePointer: number, voiceBits: number, pause: boolean) => {
		this.core.voices.forEach((voice) => {
			if (voiceBits & (1 << voice.index)) {
				voice.paused = pause;
			}
		});
		return 0;
	});

	__sceSasGetPauseFlag = createNativeFunction(0x2C8E6AB3, 150, 'uint', 'int', this, (sasCorePointer: number) => {
		var voiceBits = 0;
		this.core.voices.forEach((voice) => {
			voiceBits |= (voice.paused ? 1 : 0) << voice.index;
		});
		return voiceBits;
	});

	__sceSasGetAllEnvelopeHeights = createNativeFunction(0x07F58C24, 150, 'uint', 'int/void*', this, (sasCorePointer: number, heightPtr: Stream) => {
		this.core.voices.forEach((voice) => {
			heightPtr.writeInt32(voice.envelope.height);
		});
		return 0;
	});

	__sceSasSetNoise = createNativeFunction(0xB7660A23, 150, 'uint', 'int/int/int', this, (sasCorePointer: number, voiceId: number, noiseFrequency: number) => {
		if (noiseFrequency < 0 || noiseFrequency >= 64) return SceKernelErrors.ERROR_SAS_INVALID_NOISE_CLOCK;
		var voice = this.getSasCoreVoice(sasCorePointer, voiceId);
		return 0;
	});

	__sceSasSetVolume = createNativeFunction(0x440CA7D8, 150, 'uint', 'int/int/int/int/int/int', this, (sasCorePointer: number, voiceId: number, leftVolume: number, rightVolume: number, effectLeftVol: number, effectRightVol: number) => {
		var voice = this.getSasCoreVoice(sasCorePointer, voiceId);
		leftVolume = Math.abs(leftVolume);
		rightVolume = Math.abs(rightVolume);
		effectLeftVol = Math.abs(effectLeftVol);
		effectRightVol = Math.abs(effectRightVol);

		if (leftVolume > PSP_SAS_VOL_MAX || rightVolume > PSP_SAS_VOL_MAX || effectLeftVol > PSP_SAS_VOL_MAX || effectRightVol > PSP_SAS_VOL_MAX) {
			throw (new SceKernelException(SceKernelErrors.ERROR_SAS_INVALID_VOLUME_VAL));
		}

		voice.leftVolume = leftVolume;
		voice.rightVolume = rightVolume;
		voice.effectLeftVolume = effectLeftVol;
		voice.effectRightVolume = effectRightVol;

		return 0;
	});

	__sceSasSetPitch = createNativeFunction(0xAD84D37F, 150, 'uint', 'int/int/int', this, (sasCorePointer: number, voiceId: number, pitch: number) => {
		var voice = this.getSasCoreVoice(sasCorePointer, voiceId);
		if (pitch < PSP_SAS_PITCH_MIN || pitch > PSP_SAS_PITCH_MAX) return -1;
		voice.pitch = pitch;

		return 0;
	});

	__sceSasRevParam = createNativeFunction(0x267A6DD2, 150, 'uint', 'int/int/int', this, (sasCorePointer: number, delay: number, feedback: number) => {
		this.core.delay = delay;
		this.core.feedback = feedback;
		// Not implemented
		return 0;
	});

	__sceSasSetSimpleADSR = createNativeFunction(0xCBCD4F79, 150, 'uint', 'int/int/int/int', this, (sasCorePointer: number, voiceId: number, env1Bitfield: number, env2Bitfield: number) => {
		var voice = this.getSasCoreVoice(sasCorePointer, voiceId);
		return 0;
	});
}

class SasCore {
	initialized = false;
	grainSamples = 0;
	maxVoices = 32;
	outputMode = OutputMode.STEREO;
	sampleRate = 44100;
	delay = 0;
	feedback = 0;
	endFlags = 0;
	waveformEffectType = WaveformEffectType.OFF;
	waveformEffectIsDry = false;
	waveformEffectIsWet = false;
	leftVolume = PSP_SAS_VOL_MAX;
	rightVolume = PSP_SAS_VOL_MAX;
	voices: Voice[] = [];
	bufferTempArray = <Sample[]>[];

	constructor() {
		while (this.voices.length < 32) this.voices.push(new Voice(this.voices.length));
	}

	mix(sasCorePointer: number, sasOut: Stream, leftVolume: number, rightVolume: number) {
		while (this.bufferTempArray.length < this.grainSamples) this.bufferTempArray.push(new Sample(0, 0));

		var numberOfChannels = (this.outputMode == OutputMode.STEREO) ? 2 : 1;
		var numberOfSamples = this.grainSamples;
		var numberOfVoicesPlaying = Math.max(1, this.voices.count(Voice => Voice.onAndPlaying));

		for (var n = 0; n < numberOfSamples; n++) this.bufferTempArray[n].set(0, 0);

		var prevPosDiv = -1;

		for (var n = 0; n < this.voices.length; n++) {
			var voice = this.voices[n];
			if (!voice.onAndPlaying) continue;

			//var sampleLeftSum = 0, sampleRightSum = 0;
			//var sampleLeftMax = 0, sampleRightMax = 0;
			//var sampleCount = 0;

			var pos = 0;
			while (true) {
				if ((voice.source != null) && (voice.source.hasMore)) {
					var posDiv = Math.floor(pos / voice.pitch);

					if (posDiv >= numberOfSamples) break;

					var sample = voice.source.getNextSample();

					for (var m = prevPosDiv + 1; m <= posDiv; m++) {
						//sampleLeftSum += voice.leftVolume;
						//sampleRightSum += voice.rightVolume;
						//
						//sampleLeftMax = Math.max(sampleLeftMax, Math.abs(voice.leftVolume));
						//sampleRightMax = Math.max(sampleRightMax, Math.abs(voice.rightVolume));
						//
						//sampleCount++;
						this.bufferTempArray[m].addScaled(sample, voice.leftVolume / PSP_SAS_VOL_MAX, voice.rightVolume / PSP_SAS_VOL_MAX);
					}

					prevPosDiv = posDiv;
					pos += PSP_SAS_PITCH_BASE;
				} else {
					voice.setPlaying(false);
					break;
				}
			}
		}

		for (var n = 0; n < numberOfSamples; n++) {
			var sample = this.bufferTempArray[n];
			sample.scale(leftVolume / PSP_SAS_VOL_MAX, rightVolume / PSP_SAS_VOL_MAX);

			if (numberOfChannels >= 1) sasOut.writeInt16(MathUtils.clamp(sample.left, -32768, 32767));
			if (numberOfChannels >= 2) sasOut.writeInt16(MathUtils.clamp(sample.right, -32768, 32767));
		}

		return 0;
	}
}

interface SoundSource {
	hasMore: boolean;
	reset(): void;
	getNextSample(): Sample;
}


class Voice {
	envelope = new Envelope();
	sustainLevel = 0;
	on = false;
	playing = false;
	paused = false;
	leftVolume = PSP_SAS_VOL_MAX;
	rightVolume = PSP_SAS_VOL_MAX;
	effectLeftVolume = PSP_SAS_VOL_MAX;
	effectRightVolume = PSP_SAS_VOL_MAX;
	pitch = PSP_SAS_PITCH_BASE;
	source: SoundSource = null;

	constructor(public index: number) {
	}

	get onAndPlaying() {
		return this.on && this.playing;
	}

	setOn(set: boolean) {
		this.on = set;
		this.setPlaying(set);
	}

	setPlaying(set: boolean) {
		this.playing = set;

		// CHECK. Reset on change?
		if (this.source) this.source.reset();
	}

	get ended() {
		return !this.playing;
	}

	unsetSource() {
		this.source = null;
	}

	setAdpcm(stream: Stream, loopCount: number) {
		this.source = new VagSoundSource(stream, loopCount);
		this.source.reset();
	}

	setPCM(stream: Stream, loopCount: number) {
		this.source = new PcmSoundSource(stream, loopCount);
		this.source.reset();
	}
}


class PcmSoundSource implements SoundSource {
	constructor(stream: Stream, loopCount: number) {
	}

	reset() {
	}

	get hasMore() {
		return false;
	}

	getNextSample(): Sample {
		return null;
	}
}

class Envelope {
	attackRate = 0;
	decayRate = 0;
	sustainRate = 0;
	releaseRate = 0;
	height = 0;
}

enum OutputMode { STEREO = 0, MULTICHANNEL = 1 }
enum WaveformEffectType { OFF = -1, ROOM = 0, UNK1 = 1, UNK2 = 2, UNK3 = 3, HALL = 4, SPACE = 5, ECHO = 6, DELAY = 7, PIPE = 8 }
enum AdsrCurveMode { LINEAR_INCREASE = 0, LINEAR_DECREASE = 1, LINEAR_BENT = 2, EXPONENT_REV = 3, EXPONENT = 4, DIRECT = 5 }

enum AdsrFlags {
	HasAttack = (1 << 0),
	HasDecay = (1 << 1),
	HasSustain = (1 << 2),
	HasRelease = (1 << 3),
}
