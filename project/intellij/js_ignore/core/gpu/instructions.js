///<reference path="../../global.d.ts" />
(function (GpuOpCodes) {
    GpuOpCodes[GpuOpCodes["NOP"] = 0x00] = "NOP";
    GpuOpCodes[GpuOpCodes["VADDR"] = 0x01] = "VADDR";
    GpuOpCodes[GpuOpCodes["IADDR"] = 0x02] = "IADDR";
    GpuOpCodes[GpuOpCodes["Unknown0x03"] = 0x03] = "Unknown0x03";
    GpuOpCodes[GpuOpCodes["PRIM"] = 0x04] = "PRIM";
    GpuOpCodes[GpuOpCodes["BEZIER"] = 0x05] = "BEZIER";
    GpuOpCodes[GpuOpCodes["SPLINE"] = 0x06] = "SPLINE";
    GpuOpCodes[GpuOpCodes["BOUNDINGBOX"] = 0x07] = "BOUNDINGBOX";
    GpuOpCodes[GpuOpCodes["JUMP"] = 0x08] = "JUMP";
    GpuOpCodes[GpuOpCodes["BJUMP"] = 0x09] = "BJUMP";
    GpuOpCodes[GpuOpCodes["CALL"] = 0x0A] = "CALL";
    GpuOpCodes[GpuOpCodes["RET"] = 0x0B] = "RET";
    GpuOpCodes[GpuOpCodes["END"] = 0x0C] = "END";
    GpuOpCodes[GpuOpCodes["Unknown0x0D"] = 0x0D] = "Unknown0x0D";
    GpuOpCodes[GpuOpCodes["SIGNAL"] = 0x0E] = "SIGNAL";
    GpuOpCodes[GpuOpCodes["FINISH"] = 0x0F] = "FINISH";
    GpuOpCodes[GpuOpCodes["BASE"] = 0x10] = "BASE";
    GpuOpCodes[GpuOpCodes["Unknown0x11"] = 0x11] = "Unknown0x11";
    GpuOpCodes[GpuOpCodes["VERTEXTYPE"] = 0x12] = "VERTEXTYPE";
    GpuOpCodes[GpuOpCodes["OFFSETADDR"] = 0x13] = "OFFSETADDR";
    GpuOpCodes[GpuOpCodes["ORIGIN"] = 0x14] = "ORIGIN";
    GpuOpCodes[GpuOpCodes["REGION1"] = 0x15] = "REGION1";
    GpuOpCodes[GpuOpCodes["REGION2"] = 0x16] = "REGION2";
    GpuOpCodes[GpuOpCodes["LIGHTINGENABLE"] = 0x17] = "LIGHTINGENABLE";
    GpuOpCodes[GpuOpCodes["LIGHTENABLE0"] = 0x18] = "LIGHTENABLE0";
    GpuOpCodes[GpuOpCodes["LIGHTENABLE1"] = 0x19] = "LIGHTENABLE1";
    GpuOpCodes[GpuOpCodes["LIGHTENABLE2"] = 0x1A] = "LIGHTENABLE2";
    GpuOpCodes[GpuOpCodes["LIGHTENABLE3"] = 0x1B] = "LIGHTENABLE3";
    GpuOpCodes[GpuOpCodes["CLIPENABLE"] = 0x1C] = "CLIPENABLE";
    GpuOpCodes[GpuOpCodes["CULLFACEENABLE"] = 0x1D] = "CULLFACEENABLE";
    GpuOpCodes[GpuOpCodes["TEXTUREMAPENABLE"] = 0x1E] = "TEXTUREMAPENABLE";
    GpuOpCodes[GpuOpCodes["FOGENABLE"] = 0x1F] = "FOGENABLE";
    GpuOpCodes[GpuOpCodes["DITHERENABLE"] = 0x20] = "DITHERENABLE";
    GpuOpCodes[GpuOpCodes["ALPHABLENDENABLE"] = 0x21] = "ALPHABLENDENABLE";
    GpuOpCodes[GpuOpCodes["ALPHATESTENABLE"] = 0x22] = "ALPHATESTENABLE";
    GpuOpCodes[GpuOpCodes["ZTESTENABLE"] = 0x23] = "ZTESTENABLE";
    GpuOpCodes[GpuOpCodes["STENCILTESTENABLE"] = 0x24] = "STENCILTESTENABLE";
    GpuOpCodes[GpuOpCodes["ANTIALIASENABLE"] = 0x25] = "ANTIALIASENABLE";
    GpuOpCodes[GpuOpCodes["PATCHCULLENABLE"] = 0x26] = "PATCHCULLENABLE";
    GpuOpCodes[GpuOpCodes["COLORTESTENABLE"] = 0x27] = "COLORTESTENABLE";
    GpuOpCodes[GpuOpCodes["LOGICOPENABLE"] = 0x28] = "LOGICOPENABLE";
    GpuOpCodes[GpuOpCodes["Unknown0x29"] = 0x29] = "Unknown0x29";
    GpuOpCodes[GpuOpCodes["BONEMATRIXNUMBER"] = 0x2A] = "BONEMATRIXNUMBER";
    GpuOpCodes[GpuOpCodes["BONEMATRIXDATA"] = 0x2B] = "BONEMATRIXDATA";
    GpuOpCodes[GpuOpCodes["MORPHWEIGHT0"] = 0x2C] = "MORPHWEIGHT0";
    GpuOpCodes[GpuOpCodes["MORPHWEIGHT1"] = 0x2D] = "MORPHWEIGHT1";
    GpuOpCodes[GpuOpCodes["MORPHWEIGHT2"] = 0x2E] = "MORPHWEIGHT2";
    GpuOpCodes[GpuOpCodes["MORPHWEIGHT3"] = 0x2F] = "MORPHWEIGHT3";
    GpuOpCodes[GpuOpCodes["MORPHWEIGHT4"] = 0x30] = "MORPHWEIGHT4";
    GpuOpCodes[GpuOpCodes["MORPHWEIGHT5"] = 0x31] = "MORPHWEIGHT5";
    GpuOpCodes[GpuOpCodes["MORPHWEIGHT6"] = 0x32] = "MORPHWEIGHT6";
    GpuOpCodes[GpuOpCodes["MORPHWEIGHT7"] = 0x33] = "MORPHWEIGHT7";
    GpuOpCodes[GpuOpCodes["Unknown0x34"] = 0x34] = "Unknown0x34";
    GpuOpCodes[GpuOpCodes["Unknown0x35"] = 0x35] = "Unknown0x35";
    GpuOpCodes[GpuOpCodes["PATCHDIVISION"] = 0x36] = "PATCHDIVISION";
    GpuOpCodes[GpuOpCodes["PATCHPRIMITIVE"] = 0x37] = "PATCHPRIMITIVE";
    GpuOpCodes[GpuOpCodes["PATCHFACING"] = 0x38] = "PATCHFACING";
    GpuOpCodes[GpuOpCodes["Unknown0x39"] = 0x39] = "Unknown0x39";
    GpuOpCodes[GpuOpCodes["WORLDMATRIXNUMBER"] = 0x3A] = "WORLDMATRIXNUMBER";
    GpuOpCodes[GpuOpCodes["WORLDMATRIXDATA"] = 0x3B] = "WORLDMATRIXDATA";
    GpuOpCodes[GpuOpCodes["VIEWMATRIXNUMBER"] = 0x3C] = "VIEWMATRIXNUMBER";
    GpuOpCodes[GpuOpCodes["VIEWMATRIXDATA"] = 0x3D] = "VIEWMATRIXDATA";
    GpuOpCodes[GpuOpCodes["PROJMATRIXNUMBER"] = 0x3E] = "PROJMATRIXNUMBER";
    GpuOpCodes[GpuOpCodes["PROJMATRIXDATA"] = 0x3F] = "PROJMATRIXDATA";
    GpuOpCodes[GpuOpCodes["TGENMATRIXNUMBER"] = 0x40] = "TGENMATRIXNUMBER";
    GpuOpCodes[GpuOpCodes["TGENMATRIXDATA"] = 0x41] = "TGENMATRIXDATA";
    GpuOpCodes[GpuOpCodes["VIEWPORTX1"] = 0x42] = "VIEWPORTX1";
    GpuOpCodes[GpuOpCodes["VIEWPORTY1"] = 0x43] = "VIEWPORTY1";
    GpuOpCodes[GpuOpCodes["VIEWPORTZ1"] = 0x44] = "VIEWPORTZ1";
    GpuOpCodes[GpuOpCodes["VIEWPORTX2"] = 0x45] = "VIEWPORTX2";
    GpuOpCodes[GpuOpCodes["VIEWPORTY2"] = 0x46] = "VIEWPORTY2";
    GpuOpCodes[GpuOpCodes["VIEWPORTZ2"] = 0x47] = "VIEWPORTZ2";
    GpuOpCodes[GpuOpCodes["TEXSCALEU"] = 0x48] = "TEXSCALEU";
    GpuOpCodes[GpuOpCodes["TEXSCALEV"] = 0x49] = "TEXSCALEV";
    GpuOpCodes[GpuOpCodes["TEXOFFSETU"] = 0x4A] = "TEXOFFSETU";
    GpuOpCodes[GpuOpCodes["TEXOFFSETV"] = 0x4B] = "TEXOFFSETV";
    GpuOpCodes[GpuOpCodes["OFFSETX"] = 0x4C] = "OFFSETX";
    GpuOpCodes[GpuOpCodes["OFFSETY"] = 0x4D] = "OFFSETY";
    GpuOpCodes[GpuOpCodes["Unknown0x4E"] = 0x4E] = "Unknown0x4E";
    GpuOpCodes[GpuOpCodes["Unknown0x4F"] = 0x4F] = "Unknown0x4F";
    GpuOpCodes[GpuOpCodes["SHADEMODE"] = 0x50] = "SHADEMODE";
    GpuOpCodes[GpuOpCodes["REVERSENORMAL"] = 0x51] = "REVERSENORMAL";
    GpuOpCodes[GpuOpCodes["Unknown0x52"] = 0x52] = "Unknown0x52";
    GpuOpCodes[GpuOpCodes["MATERIALUPDATE"] = 0x53] = "MATERIALUPDATE";
    GpuOpCodes[GpuOpCodes["MATERIALEMISSIVE"] = 0x54] = "MATERIALEMISSIVE";
    GpuOpCodes[GpuOpCodes["MATERIALAMBIENT"] = 0x55] = "MATERIALAMBIENT";
    GpuOpCodes[GpuOpCodes["MATERIALDIFFUSE"] = 0x56] = "MATERIALDIFFUSE";
    GpuOpCodes[GpuOpCodes["MATERIALSPECULAR"] = 0x57] = "MATERIALSPECULAR";
    GpuOpCodes[GpuOpCodes["MATERIALALPHA"] = 0x58] = "MATERIALALPHA";
    GpuOpCodes[GpuOpCodes["Unknown0x59"] = 0x59] = "Unknown0x59";
    GpuOpCodes[GpuOpCodes["Unknown0x5A"] = 0x5A] = "Unknown0x5A";
    GpuOpCodes[GpuOpCodes["MATERIALSPECULARCOEF"] = 0x5B] = "MATERIALSPECULARCOEF";
    GpuOpCodes[GpuOpCodes["AMBIENTCOLOR"] = 0x5C] = "AMBIENTCOLOR";
    GpuOpCodes[GpuOpCodes["AMBIENTALPHA"] = 0x5D] = "AMBIENTALPHA";
    GpuOpCodes[GpuOpCodes["LIGHTMODE"] = 0x5E] = "LIGHTMODE";
    GpuOpCodes[GpuOpCodes["LIGHTTYPE0"] = 0x5F] = "LIGHTTYPE0";
    GpuOpCodes[GpuOpCodes["LIGHTTYPE1"] = 0x60] = "LIGHTTYPE1";
    GpuOpCodes[GpuOpCodes["LIGHTTYPE2"] = 0x61] = "LIGHTTYPE2";
    GpuOpCodes[GpuOpCodes["LIGHTTYPE3"] = 0x62] = "LIGHTTYPE3";
    GpuOpCodes[GpuOpCodes["LXP0"] = 0x63] = "LXP0";
    GpuOpCodes[GpuOpCodes["LYP0"] = 0x64] = "LYP0";
    GpuOpCodes[GpuOpCodes["LZP0"] = 0x65] = "LZP0";
    GpuOpCodes[GpuOpCodes["LXP1"] = 0x66] = "LXP1";
    GpuOpCodes[GpuOpCodes["LYP1"] = 0x67] = "LYP1";
    GpuOpCodes[GpuOpCodes["LZP1"] = 0x68] = "LZP1";
    GpuOpCodes[GpuOpCodes["LXP2"] = 0x69] = "LXP2";
    GpuOpCodes[GpuOpCodes["LYP2"] = 0x6A] = "LYP2";
    GpuOpCodes[GpuOpCodes["LZP2"] = 0x6B] = "LZP2";
    GpuOpCodes[GpuOpCodes["LXP3"] = 0x6C] = "LXP3";
    GpuOpCodes[GpuOpCodes["LYP3"] = 0x6D] = "LYP3";
    GpuOpCodes[GpuOpCodes["LZP3"] = 0x6E] = "LZP3";
    GpuOpCodes[GpuOpCodes["LXD0"] = 0x6F] = "LXD0";
    GpuOpCodes[GpuOpCodes["LYD0"] = 0x70] = "LYD0";
    GpuOpCodes[GpuOpCodes["LZD0"] = 0x71] = "LZD0";
    GpuOpCodes[GpuOpCodes["LXD1"] = 0x72] = "LXD1";
    GpuOpCodes[GpuOpCodes["LYD1"] = 0x73] = "LYD1";
    GpuOpCodes[GpuOpCodes["LZD1"] = 0x74] = "LZD1";
    GpuOpCodes[GpuOpCodes["LXD2"] = 0x75] = "LXD2";
    GpuOpCodes[GpuOpCodes["LYD2"] = 0x76] = "LYD2";
    GpuOpCodes[GpuOpCodes["LZD2"] = 0x77] = "LZD2";
    GpuOpCodes[GpuOpCodes["LXD3"] = 0x78] = "LXD3";
    GpuOpCodes[GpuOpCodes["LYD3"] = 0x79] = "LYD3";
    GpuOpCodes[GpuOpCodes["LZD3"] = 0x7A] = "LZD3";
    GpuOpCodes[GpuOpCodes["LCA0"] = 0x7B] = "LCA0";
    GpuOpCodes[GpuOpCodes["LLA0"] = 0x7C] = "LLA0";
    GpuOpCodes[GpuOpCodes["LQA0"] = 0x7D] = "LQA0";
    GpuOpCodes[GpuOpCodes["LCA1"] = 0x7E] = "LCA1";
    GpuOpCodes[GpuOpCodes["LLA1"] = 0x7F] = "LLA1";
    GpuOpCodes[GpuOpCodes["LQA1"] = 0x80] = "LQA1";
    GpuOpCodes[GpuOpCodes["LCA2"] = 0x81] = "LCA2";
    GpuOpCodes[GpuOpCodes["LLA2"] = 0x82] = "LLA2";
    GpuOpCodes[GpuOpCodes["LQA2"] = 0x83] = "LQA2";
    GpuOpCodes[GpuOpCodes["LCA3"] = 0x84] = "LCA3";
    GpuOpCodes[GpuOpCodes["LLA3"] = 0x85] = "LLA3";
    GpuOpCodes[GpuOpCodes["LQA3"] = 0x86] = "LQA3";
    GpuOpCodes[GpuOpCodes["SPOTEXP0"] = 0x87] = "SPOTEXP0";
    GpuOpCodes[GpuOpCodes["SPOTEXP1"] = 0x88] = "SPOTEXP1";
    GpuOpCodes[GpuOpCodes["SPOTEXP2"] = 0x89] = "SPOTEXP2";
    GpuOpCodes[GpuOpCodes["SPOTEXP3"] = 0x8A] = "SPOTEXP3";
    GpuOpCodes[GpuOpCodes["SPOTCUT0"] = 0x8B] = "SPOTCUT0";
    GpuOpCodes[GpuOpCodes["SPOTCUT1"] = 0x8C] = "SPOTCUT1";
    GpuOpCodes[GpuOpCodes["SPOTCUT2"] = 0x8D] = "SPOTCUT2";
    GpuOpCodes[GpuOpCodes["SPOTCUT3"] = 0x8E] = "SPOTCUT3";
    GpuOpCodes[GpuOpCodes["ALC0"] = 0x8F] = "ALC0";
    GpuOpCodes[GpuOpCodes["DLC0"] = 0x90] = "DLC0";
    GpuOpCodes[GpuOpCodes["SLC0"] = 0x91] = "SLC0";
    GpuOpCodes[GpuOpCodes["ALC1"] = 0x92] = "ALC1";
    GpuOpCodes[GpuOpCodes["DLC1"] = 0x93] = "DLC1";
    GpuOpCodes[GpuOpCodes["SLC1"] = 0x94] = "SLC1";
    GpuOpCodes[GpuOpCodes["ALC2"] = 0x95] = "ALC2";
    GpuOpCodes[GpuOpCodes["DLC2"] = 0x96] = "DLC2";
    GpuOpCodes[GpuOpCodes["SLC2"] = 0x97] = "SLC2";
    GpuOpCodes[GpuOpCodes["ALC3"] = 0x98] = "ALC3";
    GpuOpCodes[GpuOpCodes["DLC3"] = 0x99] = "DLC3";
    GpuOpCodes[GpuOpCodes["SLC3"] = 0x9A] = "SLC3";
    GpuOpCodes[GpuOpCodes["CULL"] = 0x9B] = "CULL";
    GpuOpCodes[GpuOpCodes["FRAMEBUFPTR"] = 0x9C] = "FRAMEBUFPTR";
    GpuOpCodes[GpuOpCodes["FRAMEBUFWIDTH"] = 0x9D] = "FRAMEBUFWIDTH";
    GpuOpCodes[GpuOpCodes["ZBUFPTR"] = 0x9E] = "ZBUFPTR";
    GpuOpCodes[GpuOpCodes["ZBUFWIDTH"] = 0x9F] = "ZBUFWIDTH";
    GpuOpCodes[GpuOpCodes["TEXADDR0"] = 0xA0] = "TEXADDR0";
    GpuOpCodes[GpuOpCodes["TEXADDR1"] = 0xA1] = "TEXADDR1";
    GpuOpCodes[GpuOpCodes["TEXADDR2"] = 0xA2] = "TEXADDR2";
    GpuOpCodes[GpuOpCodes["TEXADDR3"] = 0xA3] = "TEXADDR3";
    GpuOpCodes[GpuOpCodes["TEXADDR4"] = 0xA4] = "TEXADDR4";
    GpuOpCodes[GpuOpCodes["TEXADDR5"] = 0xA5] = "TEXADDR5";
    GpuOpCodes[GpuOpCodes["TEXADDR6"] = 0xA6] = "TEXADDR6";
    GpuOpCodes[GpuOpCodes["TEXADDR7"] = 0xA7] = "TEXADDR7";
    GpuOpCodes[GpuOpCodes["TEXBUFWIDTH0"] = 0xA8] = "TEXBUFWIDTH0";
    GpuOpCodes[GpuOpCodes["TEXBUFWIDTH1"] = 0xA9] = "TEXBUFWIDTH1";
    GpuOpCodes[GpuOpCodes["TEXBUFWIDTH2"] = 0xAA] = "TEXBUFWIDTH2";
    GpuOpCodes[GpuOpCodes["TEXBUFWIDTH3"] = 0xAB] = "TEXBUFWIDTH3";
    GpuOpCodes[GpuOpCodes["TEXBUFWIDTH4"] = 0xAC] = "TEXBUFWIDTH4";
    GpuOpCodes[GpuOpCodes["TEXBUFWIDTH5"] = 0xAD] = "TEXBUFWIDTH5";
    GpuOpCodes[GpuOpCodes["TEXBUFWIDTH6"] = 0xAE] = "TEXBUFWIDTH6";
    GpuOpCodes[GpuOpCodes["TEXBUFWIDTH7"] = 0xAF] = "TEXBUFWIDTH7";
    GpuOpCodes[GpuOpCodes["CLUTADDR"] = 0xB0] = "CLUTADDR";
    GpuOpCodes[GpuOpCodes["CLUTADDRUPPER"] = 0xB1] = "CLUTADDRUPPER";
    GpuOpCodes[GpuOpCodes["TRXSBP"] = 0xB2] = "TRXSBP";
    GpuOpCodes[GpuOpCodes["TRXSBW"] = 0xB3] = "TRXSBW";
    GpuOpCodes[GpuOpCodes["TRXDBP"] = 0xB4] = "TRXDBP";
    GpuOpCodes[GpuOpCodes["TRXDBW"] = 0xB5] = "TRXDBW";
    GpuOpCodes[GpuOpCodes["Unknown0xB6"] = 0xB6] = "Unknown0xB6";
    GpuOpCodes[GpuOpCodes["Unknown0xB7"] = 0xB7] = "Unknown0xB7";
    GpuOpCodes[GpuOpCodes["TSIZE0"] = 0xB8] = "TSIZE0";
    GpuOpCodes[GpuOpCodes["TSIZE1"] = 0xB9] = "TSIZE1";
    GpuOpCodes[GpuOpCodes["TSIZE2"] = 0xBA] = "TSIZE2";
    GpuOpCodes[GpuOpCodes["TSIZE3"] = 0xBB] = "TSIZE3";
    GpuOpCodes[GpuOpCodes["TSIZE4"] = 0xBC] = "TSIZE4";
    GpuOpCodes[GpuOpCodes["TSIZE5"] = 0xBD] = "TSIZE5";
    GpuOpCodes[GpuOpCodes["TSIZE6"] = 0xBE] = "TSIZE6";
    GpuOpCodes[GpuOpCodes["TSIZE7"] = 0xBF] = "TSIZE7";
    GpuOpCodes[GpuOpCodes["TMAP"] = 0xC0] = "TMAP";
    GpuOpCodes[GpuOpCodes["TEXTURE_ENV_MAP_MATRIX"] = 0xC1] = "TEXTURE_ENV_MAP_MATRIX";
    GpuOpCodes[GpuOpCodes["TMODE"] = 0xC2] = "TMODE";
    GpuOpCodes[GpuOpCodes["TPSM"] = 0xC3] = "TPSM";
    GpuOpCodes[GpuOpCodes["CLOAD"] = 0xC4] = "CLOAD";
    GpuOpCodes[GpuOpCodes["CMODE"] = 0xC5] = "CMODE";
    GpuOpCodes[GpuOpCodes["TFLT"] = 0xC6] = "TFLT";
    GpuOpCodes[GpuOpCodes["TWRAP"] = 0xC7] = "TWRAP";
    GpuOpCodes[GpuOpCodes["TBIAS"] = 0xC8] = "TBIAS";
    GpuOpCodes[GpuOpCodes["TFUNC"] = 0xC9] = "TFUNC";
    GpuOpCodes[GpuOpCodes["TEC"] = 0xCA] = "TEC";
    GpuOpCodes[GpuOpCodes["TFLUSH"] = 0xCB] = "TFLUSH";
    GpuOpCodes[GpuOpCodes["TSYNC"] = 0xCC] = "TSYNC";
    GpuOpCodes[GpuOpCodes["FFAR"] = 0xCD] = "FFAR";
    GpuOpCodes[GpuOpCodes["FDIST"] = 0xCE] = "FDIST";
    GpuOpCodes[GpuOpCodes["FCOL"] = 0xCF] = "FCOL";
    GpuOpCodes[GpuOpCodes["TSLOPE"] = 0xD0] = "TSLOPE";
    GpuOpCodes[GpuOpCodes["Unknown0xD1"] = 0xD1] = "Unknown0xD1";
    GpuOpCodes[GpuOpCodes["PSM"] = 0xD2] = "PSM";
    GpuOpCodes[GpuOpCodes["CLEAR"] = 0xD3] = "CLEAR";
    GpuOpCodes[GpuOpCodes["SCISSOR1"] = 0xD4] = "SCISSOR1";
    GpuOpCodes[GpuOpCodes["SCISSOR2"] = 0xD5] = "SCISSOR2";
    GpuOpCodes[GpuOpCodes["MINZ"] = 0xD6] = "MINZ";
    GpuOpCodes[GpuOpCodes["MAXZ"] = 0xD7] = "MAXZ";
    GpuOpCodes[GpuOpCodes["CTST"] = 0xD8] = "CTST";
    GpuOpCodes[GpuOpCodes["CREF"] = 0xD9] = "CREF";
    GpuOpCodes[GpuOpCodes["CMSK"] = 0xDA] = "CMSK";
    GpuOpCodes[GpuOpCodes["ATST"] = 0xDB] = "ATST";
    GpuOpCodes[GpuOpCodes["STST"] = 0xDC] = "STST";
    GpuOpCodes[GpuOpCodes["SOP"] = 0xDD] = "SOP";
    GpuOpCodes[GpuOpCodes["ZTST"] = 0xDE] = "ZTST";
    GpuOpCodes[GpuOpCodes["ALPHA"] = 0xDF] = "ALPHA";
    GpuOpCodes[GpuOpCodes["SFIX"] = 0xE0] = "SFIX";
    GpuOpCodes[GpuOpCodes["DFIX"] = 0xE1] = "DFIX";
    GpuOpCodes[GpuOpCodes["DTH0"] = 0xE2] = "DTH0";
    GpuOpCodes[GpuOpCodes["DTH1"] = 0xE3] = "DTH1";
    GpuOpCodes[GpuOpCodes["DTH2"] = 0xE4] = "DTH2";
    GpuOpCodes[GpuOpCodes["DTH3"] = 0xE5] = "DTH3";
    GpuOpCodes[GpuOpCodes["LOP"] = 0xE6] = "LOP";
    GpuOpCodes[GpuOpCodes["ZMSK"] = 0xE7] = "ZMSK";
    GpuOpCodes[GpuOpCodes["PMSKC"] = 0xE8] = "PMSKC";
    GpuOpCodes[GpuOpCodes["PMSKA"] = 0xE9] = "PMSKA";
    GpuOpCodes[GpuOpCodes["TRXKICK"] = 0xEA] = "TRXKICK";
    GpuOpCodes[GpuOpCodes["TRXSPOS"] = 0xEB] = "TRXSPOS";
    GpuOpCodes[GpuOpCodes["TRXDPOS"] = 0xEC] = "TRXDPOS";
    GpuOpCodes[GpuOpCodes["Unknown0xED"] = 0xED] = "Unknown0xED";
    GpuOpCodes[GpuOpCodes["TRXSIZE"] = 0xEE] = "TRXSIZE";
    GpuOpCodes[GpuOpCodes["Unknown0xEF"] = 0xEF] = "Unknown0xEF";
    GpuOpCodes[GpuOpCodes["Unknown0xF0"] = 0xF0] = "Unknown0xF0";
    GpuOpCodes[GpuOpCodes["Unknown0xF1"] = 0xF1] = "Unknown0xF1";
    GpuOpCodes[GpuOpCodes["Unknown0xF2"] = 0xF2] = "Unknown0xF2";
    GpuOpCodes[GpuOpCodes["Unknown0xF3"] = 0xF3] = "Unknown0xF3";
    GpuOpCodes[GpuOpCodes["Unknown0xF4"] = 0xF4] = "Unknown0xF4";
    GpuOpCodes[GpuOpCodes["Unknown0xF5"] = 0xF5] = "Unknown0xF5";
    GpuOpCodes[GpuOpCodes["Unknown0xF6"] = 0xF6] = "Unknown0xF6";
    GpuOpCodes[GpuOpCodes["Unknown0xF7"] = 0xF7] = "Unknown0xF7";
    GpuOpCodes[GpuOpCodes["Unknown0xF8"] = 0xF8] = "Unknown0xF8";
    GpuOpCodes[GpuOpCodes["Unknown0xF9"] = 0xF9] = "Unknown0xF9";
    GpuOpCodes[GpuOpCodes["Unknown0xFA"] = 0xFA] = "Unknown0xFA";
    GpuOpCodes[GpuOpCodes["Unknown0xFB"] = 0xFB] = "Unknown0xFB";
    GpuOpCodes[GpuOpCodes["Unknown0xFC"] = 0xFC] = "Unknown0xFC";
    GpuOpCodes[GpuOpCodes["Unknown0xFD"] = 0xFD] = "Unknown0xFD";
    GpuOpCodes[GpuOpCodes["Unknown0xFE"] = 0xFE] = "Unknown0xFE";
    GpuOpCodes[GpuOpCodes["DUMMY"] = 0xFF] = "DUMMY";
})(exports.GpuOpCodes || (exports.GpuOpCodes = {}));
var GpuOpCodes = exports.GpuOpCodes;
//# sourceMappingURL=instructions.js.map