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
    'vanderbilt-padres': vanderbiltPadres,
    'phq-15': phq15,
    'zung-sas': zungSas,
    'pfeiffer': pfeiffer,
    'slums': slums,
    'ace-iii': aceIII,
    'peds': peds,
    'wong-baker': wongBaker,
    'goldberg': goldberg,
    'pss-14': pss,
    'c-ssrs': cssrs,
    'mdq': mdq,
    'cage': cage,
    'audit': audit,
    'eat-10': eat10,
    'barthel': barthel,
    'lawton-brody': lawton
}

export function getTestDefinition(id: string) {
    return standardTests[id as keyof typeof standardTests]
}
