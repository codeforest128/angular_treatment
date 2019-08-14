export class Treatment {
    medic_name: string;
    medic_cis: number;
}

export class MultiChoice {
    choices: Array<string> = [];
    choice_index: number = null;

    constructor(new_choices) {
        this.choices = [...new_choices];
    }
}

export class MultiChoices {
    choices: Array<any> = [];

    constructor(new_choices) {
        this.choices = new_choices.map(elem => {
            return {choice: elem, active: false}
        })
    }
}

export class PatientData {
    name: string = '';
    firstname: string = '';
    size: number = null;
    weight: number = null;
    gender: string = '';
    IMC: number = null;
    pregnant: boolean = false;
}

export class InterventionDetails {
    name: string = '';
    date: string = '';
    type: string = '';
    surgeon: string = '';
    NIR: number = null;
    emergency: boolean = false;
}

export class InterventionProtocol {
    ASA: number = 1;
    anesthesy: MultiChoice = new MultiChoice([
        'Générale',
        'Générale ISR',
        'Neuroleptanalgésie',
        'Locale'
    ]);
    alr: MultiChoice = new MultiChoice([
        'Bloc Axillaire',
        'Bloc Fémoral',
        'BIS',
        'Bibloc Femoral/Sciatique',
        'Sciatique Poplité',
        'Tronculaires MSup',
        'Tronculaires MInf',
        'SupraClaviculaire MSup',
    ]);
    apd_rachi: MultiChoice = new MultiChoice([
        'Non',
        'Péridurale',
        'Rachianesthésie',
        'Périrachianésthesie'
    ]);
    antibioprophylaxie:MultiChoice = new MultiChoice([
        'Non Recommandée',
        'Céfazoline',
        'Ac. clavulanique - Amoxicilline',
        'Cefoxitine',
        'Metronidazole',
        'Vancomycine'
    ]);
    tromboembelic_risk: MultiChoice = new MultiChoice([
        'Mineur',
        'Modéré',
        'Majeur'
    ]);
    troboembelic_prevention: MultiChoices = new MultiChoices([
        'Bas de contention',
        'HBPM',
        'HBPM/12h',
        'CPI',
        'HNF'
    ]);
    hemoragic_risk: MultiChoice = new MultiChoice([
        'Mineur',
        'Modéré',
        'Majeur'
    ]);
    hemoragic_prevention: MultiChoices = new MultiChoices([
        'Exacyl',
        'VVPx2',
        'EPO',
        'CellSaver',
        'Réservation CGR à faire'
    ]);
    intubation: MultiChoice = new MultiChoice([
        'facile',
        'difficile'
    ]);
    intubation_difficulty: MultiChoices = new MultiChoices([
        'Mallampati > 3',
        'Mob. cervicale Diminuée/bloquée',
        'DTM < 65mm',
        'OB inf. réduite',
        'Présence Rétrognatisme',
        'Echec Lip test'
    ]);
    CI: MultiChoices = new MultiChoices([
        'CI nefopam',
        'CI AINS'
    ]);
    preop_summary: string = '';
    postop_summary: string = '';
    comment: string = ''
}

class Intervention {
    details: InterventionDetails = new InterventionDetails;
    protocol: InterventionProtocol = new InterventionProtocol;
}

export class Pathology {
    pathology_cim10: string = '';
    pathology_short_name: string = '';
    pathology_long_name: string = '';
    display_name: string = '';
    comment: string = '';
}

export class Obstetric {
    preg: boolean = null;
    term_preg_date: string = '';
    weight_before_preg: number = null;
    easy_back: boolean = null;
    varicoses: boolean = null;
    preeclampsia: boolean = null;
    epidural: MultiChoice = new MultiChoice([
        'Souhaitée',
        'Non souhaitée',
        'Ne sait pas'
    ])
    epidural_required: boolean = false;
    ultrasono_date: string = '';
    foetus_count: number = null;
    foetus_presentation: MultiChoice = new MultiChoice([
        'Céphalique',
        'Siège',
        'Transverse'
    ])
    fetal_biometrics: MultiChoice = new MultiChoice([
        'Normal',
        'Macrosome',
        'PPAG',
        'RCIU'
    ])
    placenta: MultiChoice = new MultiChoice([
        'Normal',
        'Bas inséré',
        'Praevia',
        'Accreta'
    ])
    comment: string = '';

}

class Pathologies {
    cardio: Array<Pathology> = [];
    neuro: Array<Pathology> = [];
    digestion: Array<Pathology> = [];
    metabolic: Array<Pathology> = [];
    uro_nephro: Array<Pathology> = [];
    gyneco: Array<Pathology> = [];
    hemato: Array<Pathology> = [];
    dentition: Array<Pathology> = [];
    respiratory: Array<Pathology> = [];
    family: Array<Pathology> = [];
    toxic: Array<Pathology> = [];
    obstetric: Obstetric = new Obstetric;
    other: Array<Pathology> = [];
}

class Antecedents {
    surgery: Array<any> = [];
    complications: Array<any> = [];
    allergies: Array<any> = [];
    pathologies: Pathologies = new Pathologies;
}

class Blood {
    HB: number = null;
    platelet: number = null;
    blood_type: string = '';
    RAI: string = '';
    TCA: string = '';
    TP: number = null;
    Na: number = null;
    K: number = null;
    creat: number = null;
}

export class Clinical_Exam {
    blood_pressure_systo: number = null;
    blood_pressure_diasto: number = null;
    pulse: number = null;
    sp02: number = null;
    normal_cardiac_auscultation: boolean = true;
    NYHA: MultiChoice = new MultiChoice([
        1,
        2,
        3,
        4
    ]);
    MET_over_4: boolean = true;
    cardiac_auscult: string = '';
    normal_pulmonary_auscultation: boolean = true;
    pulmonary_auscult: string = '';
    veinous_access: MultiChoice = new MultiChoice([
        'Facile',
        'Difficile'
    ]);
    comment: string = '';
}

class Examination {
    ECG: string = '';
    blood: Blood = new Blood;
    complementary: string = '';
}

export class ConsultationModel {
    version: number;

    patient_data: PatientData = new PatientData;

    intervention: Intervention = new Intervention;

    antecedents: Antecedents = new Antecedents;

    treatment: Array<Treatment> = [];

    premedication: Array<Treatment> = [];

    clinical_exam: Clinical_Exam = new Clinical_Exam;

    examination: Examination = new Examination;

    get consultation() {
        return ({
            patient_data: this.patient_data,
            intervention: this.intervention,
            antecedents: this.antecedents,
            treatment: this.treatment,
            examination: this.examination,
            premedication: this.premedication,
            clinical_exam: this.clinical_exam
        });
    }

    get patientFullName() {
        if (!this.patient_data)
            return '';
        return `${this.jsUcfirst(this.patient_data.firstname)} ${this.jsUcfirst(this.patient_data.name)}`
    }

    jsUcfirst(string) {
        if (!string)
            return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}