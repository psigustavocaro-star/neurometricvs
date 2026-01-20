import { depressionScale } from '@/lib/tests/phq9'
import { snapIV } from '@/lib/tests/snap-iv'
import { gad7 } from '@/lib/tests/gad7'
import { gad2 } from '@/lib/tests/gad2'
import { phq2 } from '@/lib/tests/phq2'
import { epds } from '@/lib/tests/epds'
import { gds15 } from '@/lib/tests/gds15'
import { psc17 } from '@/lib/tests/psc17'
import { asrsV11 } from '@/lib/tests/asrs-v1.1'
import { who5 } from '@/lib/tests/who5'
import { apgarFamiliar } from '@/lib/tests/apgar-familiar'
import { rosenbergSelfEsteem } from '@/lib/tests/rosenberg'
import { bis11 } from '@/lib/tests/bis11'
import { scared } from '@/lib/tests/scared'
import { mChatRF } from '@/lib/tests/m-chat-r-f'
import { vanderbiltPadres } from '@/lib/tests/vanderbilt-padres'
import { phq15 } from '@/lib/tests/phq15'
import { zungSas } from '@/lib/tests/zung-sas'
import { pfeiffer } from '@/lib/tests/pfeiffer'
import { slums } from '@/lib/tests/slums'
import { aceIII } from '@/lib/tests/ace-iii'
import { peds } from '@/lib/tests/peds'
import { wongBaker } from '@/lib/tests/wong-baker'
import { goldberg } from '@/lib/tests/goldberg'
import { pss } from '@/lib/tests/pss'
import { cssrs } from '@/lib/tests/c-ssrs'
import { mdq } from '@/lib/tests/mdq'
import { cage } from '@/lib/tests/cage'
import { audit } from '@/lib/tests/audit'
import { eat10 } from '@/lib/tests/eat-10'
import { barthel } from '@/lib/tests/barthel'
import { lawton } from '@/lib/tests/lawton-brody'

import { qChat } from '@/lib/tests/q-chat'
import { cast } from '@/lib/tests/cast'
import { cesDc } from '@/lib/tests/ces-dc'
import { crafft } from '@/lib/tests/crafft'
import { altman } from '@/lib/tests/altman'
import { bsds } from '@/lib/tests/bsds'
import { pss10 } from '@/lib/tests/pss-10'

import { pcl5 } from '@/lib/tests/pcl-5'
import { iesR } from '@/lib/tests/ies-r'
import { k10 } from '@/lib/tests/k-10'
import { dast10 } from '@/lib/tests/dast-10'
import { auditC } from '@/lib/tests/audit-c'

import { fagerstrom } from '@/lib/tests/fagerstrom'
import { tweak } from '@/lib/tests/tweak'
import { swls } from '@/lib/tests/swls'
import { lotR } from '@/lib/tests/lot-r'
import { autoeficacia } from '@/lib/tests/autoeficacia'
import { wurs } from '@/lib/tests/wurs'

import { miniCog } from '@/lib/tests/mini-cog'
import { ad8 } from '@/lib/tests/ad8'
import { iqcode } from '@/lib/tests/iqcode'
import { cornell } from '@/lib/tests/cornell'
import { katz } from '@/lib/tests/katz'
import { zarit } from '@/lib/tests/zarit'

import { stopBang } from '@/lib/tests/stop-bang'
import { iief5 } from '@/lib/tests/iief-5'
import { fsfi } from '@/lib/tests/fsfi'
import { eq5d } from '@/lib/tests/eq-5d'
import { isi } from '@/lib/tests/isi'
import { dyadicAdjustment } from '@/lib/tests/dyadic-adjustment'

import { mrs } from '@/lib/tests/neurology/mrs'
import { nihss } from '@/lib/tests/neurology/nihss'
import { ociR } from '@/lib/tests/psychiatry/oci-r'
import { ybocs } from '@/lib/tests/psychiatry/y-bocs'
import { zungSds } from '@/lib/tests/psychology/zung-sds'
import { ipipNeo } from '@/lib/tests/psychology/ipip-neo'
import { assist } from '@/lib/tests/addiction/assist'
import { bprs } from '@/lib/tests/psychiatry/bprs'
import { sadPersons } from '@/lib/tests/psychiatry/sad-persons'
import { panss } from '@/lib/tests/psychiatry/panss'
import { berg } from '@/lib/tests/neurology/berg'
import { quickDash } from '@/lib/tests/occupational/quick-dash'
import { mAmas } from '@/lib/tests/pediatrics/m-amas'
import { guss } from '@/lib/tests/other/guss'
import { edss } from '@/lib/tests/neurology/edss'
import { fois } from '@/lib/tests/speech/fois'
import { sans } from '@/lib/tests/psychiatry/sans'
import { weis } from '@/lib/tests/occupational/weis'
import { capeV } from '@/lib/tests/speech/cape-v'
import { grbas } from '@/lib/tests/speech/grbas'
import { mdsUpdrs } from '@/lib/tests/neurology/mds-updrs'
import { efpt } from '@/lib/tests/occupational/efpt'
import { fast } from '@/lib/tests/speech/fast'
import { sage } from '@/lib/tests/geriatrics/sage'
import { clockDrawing } from '@/lib/tests/neurology/clock-drawing'
import { cains } from '@/lib/tests/psychiatry/cains'
import { spm2 } from '@/lib/tests/occupational/spm-2'
import { bostonNaming } from '@/lib/tests/speech/boston-naming'
import { jebsenTaylor } from '@/lib/tests/occupational/jebsen-taylor'
import { kettle } from '@/lib/tests/occupational/kettle'
import { wabr } from '@/lib/tests/speech/wab-r'
import { oiq } from '@/lib/tests/occupational/oiq'
import { bcat } from '@/lib/tests/neurology/bcat'
import { domino } from '@/lib/tests/pediatrics/domino'
import { carasR } from '@/lib/tests/psychology/caras-r'
import { prolecR } from '@/lib/tests/pediatrics/prolec-r'
import { das7 } from '@/lib/tests/psychology/das-7'
import { gfta3 } from '@/lib/tests/speech/gfta-3'
import { tpl } from '@/lib/tests/speech/tpl'
import { tmt } from '@/lib/tests/neurology/tmt'
import { stroop } from '@/lib/tests/neurology/stroop'
import { ravlt } from '@/lib/tests/neurology/ravlt'
import { digitSpan } from '@/lib/tests/neurology/digit-span'
import { sdmt } from '@/lib/tests/neurology/sdmt'
import { conners3 } from '@/lib/tests/pediatrics/conners-3'
import { brief2 } from '@/lib/tests/pediatrics/brief-2'
import { vineland3 } from '@/lib/tests/pediatrics/vineland-3'
import { bdiII } from '@/lib/tests/psychology/bdi-ii'
import { bai } from '@/lib/tests/psychology/bai'
import { asrm } from '@/lib/tests/psychiatry/asrm'
import { vagus } from '@/lib/tests/psychiatry/vagus'
import { neo } from '@/lib/tests/pediatrics/neo'
import { pedi } from '@/lib/tests/pediatrics/pedi'

export const standardTests = {
    'phq-9': depressionScale,
    'phq-2': phq2,
    'gad-7': gad7,
    'gad-2': gad2,
    'epds': epds,
    'gds-15': gds15,
    'psc-17': psc17,
    'asrs-v1.1': asrsV11,
    'who-5': who5,
    'apgar-familiar': apgarFamiliar,
    'snap-iv': snapIV,
    'rosenberg': rosenbergSelfEsteem,
    'bis-11': bis11,
    'scared': scared,
    'm-chat-r-f': mChatRF,
    'q-chat': qChat,
    'cast': cast,
    'ces-dc': cesDc,
    'crafft': crafft,
    'vanderbilt-padres': vanderbiltPadres,
    'phq-15': phq15,
    'zung-sas': zungSas,
    'zung-sds': zungSds,
    'pfeiffer': pfeiffer,
    'slums': slums,
    'ace-iii': aceIII,
    'peds': peds,
    'wong-baker': wongBaker,
    'goldberg': goldberg,
    'pss-14': pss,
    'pss-10': pss10,
    'c-ssrs': cssrs,
    'mdq': mdq,
    'altman': altman,
    'bsds': bsds,
    'cage': cage,
    'audit': audit,
    'audit-c': auditC,
    'pcl-5': pcl5,
    'ies-r': iesR,
    'k-10': k10,
    'dast-10': dast10,
    'fagerstrom': fagerstrom,
    'tweak': tweak,
    'swls': swls,
    'lot-r': lotR,
    'autoeficacia': autoeficacia,
    'wurs': wurs,
    'mini-cog': miniCog,
    'ad8': ad8,
    'iqcode': iqcode,
    'cornell': cornell,
    'katz': katz,
    'zarit': zarit,
    'stop-bang': stopBang,
    'iief-5': iief5,
    'fsfi': fsfi,
    'eq-5d-3l': eq5d,
    'isi': isi,
    'dyadic-adjustment': dyadicAdjustment,
    'eat-10': eat10,
    'barthel': barthel,
    'lawton-brody': lawton,
    'mrs': mrs,
    'nihss': nihss,
    'oci-r': ociR,
    'y-bocs': ybocs,
    'ipip-neo': ipipNeo,
    'assist': assist,
    'bprs': bprs,
    'sad-persons': sadPersons,
    'panss': panss,
    'berg': berg,
    'quick-dash': quickDash,
    'm-amas': mAmas,
    'guss': guss,
    'edss': edss,
    'fois': fois,
    'sans': sans,
    'weis': weis,
    'cape-v': capeV,
    'grbas': grbas,
    'mds-updrs': mdsUpdrs,
    'efpt': efpt,
    'fast': fast,
    'sage': sage,
    'clock-drawing': clockDrawing,
    'cains': cains,
    'spm-2': spm2,
    'boston-naming': bostonNaming,
    'jebsen-taylor': jebsenTaylor,
    'kettle': kettle,
    'wab-r': wabr,
    'oiq': oiq,
    'bcat': bcat,
    'domino': domino,
    'caras-r': carasR,
    'prolec-r': prolecR,
    'das-7': das7,
    'gfta-3': gfta3,
    'tpl': tpl,
    'tmt': tmt,
    'stroop': stroop,
    'ravlt': ravlt,
    'digit-span': digitSpan,
    'sdmt': sdmt,
    'conners-3': conners3,
    'brief-2': brief2,
    'vineland-3': vineland3,
    'bdi-ii': bdiII,
    'bai': bai,
    'asrm': asrm,
    'vagus': vagus,
    'neo': neo,
    'pedi': pedi
}

export function getTestDefinition(id: string) {
    return standardTests[id as keyof typeof standardTests]
}
