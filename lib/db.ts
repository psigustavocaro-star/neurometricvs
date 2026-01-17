import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { Patient } from '@/types/patient'

const DB_PATH = path.join(process.cwd(), 'data', 'db.json')

export interface Invitation {
    id: string
    token: string
    patientId: string
    testId: string
    status: 'pending' | 'completed' | 'expired'
    createdAt: string
    expiresAt: string
    completedAt?: string
}

export interface TestResult {
    id: string
    patientId: string
    testId: string
    date: string
    scores: any
    answers: any
    invitationId?: string // Optional, if coming from an invite
}

interface DBSchema {
    patients: Patient[]
    invitations: Invitation[]
    results: TestResult[]
}

const initialData: DBSchema = {
    patients: [],
    invitations: [],
    results: []
}

// Ensure DB file exists
function ensureDB() {
    if (!fs.existsSync(DB_PATH)) {
        const dir = path.dirname(DB_PATH)
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }
        fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2))
    }
}

// Read DB
export function readDB(): DBSchema {
    ensureDB()
    const data = fs.readFileSync(DB_PATH, 'utf-8')
    try {
        return JSON.parse(data)
    } catch (e) {
        return initialData
    }
}

// Write DB
function writeDB(data: DBSchema) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
}

// --- Invitations ---

export function createInvitation(patientId: string, testId: string, expiresInDays = 7) {
    const db = readDB()
    const token = uuidv4()
    const now = new Date()
    const expires = new Date(now.getTime() + expiresInDays * 24 * 60 * 60 * 1000)

    const invitation: Invitation = {
        id: uuidv4(),
        token,
        patientId,
        testId,
        status: 'pending',
        createdAt: now.toISOString(),
        expiresAt: expires.toISOString()
    }

    db.invitations.push(invitation)
    writeDB(db)
    return invitation
}

export function getInvitationByToken(token: string): Invitation | null {
    const db = readDB()
    const invite = db.invitations.find(i => i.token === token)
    if (!invite) return null
    return invite
}

export function markInvitationCompleted(id: string) {
    const db = readDB()
    const index = db.invitations.findIndex(i => i.id === id)
    if (index !== -1) {
        db.invitations[index].status = 'completed'
        db.invitations[index].completedAt = new Date().toISOString()
        writeDB(db)
    }
}

// --- Results ---

export function saveResult(result: Omit<TestResult, 'id'>) {
    const db = readDB()
    const newResult: TestResult = {
        ...result,
        id: uuidv4()
    }
    db.results.push(newResult)
    writeDB(db)
    return newResult
}

export function getPatientResults(patientId: string) {
    const db = readDB()
    return db.results.filter(r => r.patientId === patientId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// --- Patients (Basic CRUD for persistence) ---
export function savePatient(patient: Patient) {
    const db = readDB()
    const index = db.patients.findIndex(p => p.id === patient.id)
    if (index !== -1) {
        db.patients[index] = patient
    } else {
        db.patients.push(patient)
    }
    writeDB(db)
}

export function getPatients() {
    const db = readDB()
    return db.patients
}

export function getPatientById(id: string) {
    const db = readDB()
    return db.patients.find(p => p.id === id) || null
}
