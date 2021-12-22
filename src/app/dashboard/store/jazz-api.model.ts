export interface Applicant {
  // /applicants
  id: string;
  first_name: string;
  last_name: string;
  prospect_phone: string;
  apply_date: string;
  job_id: string;
  job_title: string;
  // end of /applicants

  // new backend api custom fields
  full_name?: string;

  // /applicants/applicant_id
  // also includes properties:
  // id
  // first_name
  // last_name
  // apply_date
  email?: string;
  address?: string;
  location?: string;
  phone?: string;
  linkedin_url?: string;
  eeo_gender?: null; // ?
  eeo_race?: null; // ?
  eeo_disability?: null; // ?
  website?: string;
  desired_salary?: string;
  desired_start_date?: string;
  referrer?: string;
  languages?: string;
  wmyu?: string;
  has_driver_license?: string;
  willing_to_relocate?: string;
  citizenship_status?: string;
  education_level?: string;
  has_cdl?: string;
  over_18?: string;
  can_work_weekends?: string;
  can_work_evenings?: string;
  can_work_overtime?: string;
  has_felony?: string;
  felony_explanation?: string;
  twitter_username?: string;
  college_gpa?: string;
  college?: string;
  references?: string;
  notes?: string;
  comments_count?: string;
  source?: string;
  recruiter_id?: string;
  eeoc_veteran?: null; // ?
  eeoc_disability?: null; // ?
  eeoc_disability_signature?: null; // ?
  eeoc_disability_date?: null; // ?
  jobs?: ApplicantJob[];
  comments?: ApplicantComment[];
  feedback?: {
    id: string;
    author_id: string;
    text: string;
    date: string; // yyyy-mm-dd
    time: string; // hh:mm:ss
    privacy: string;
    is_external: string;
  };
  rating?: ApplicantRating[];
  resume_link?: string;
  activities?: ApplicantActivity[];
  messages?: ApplicantMessage[];
  questionnaire?: ApplicantQuestion[];
  evaluation?: ApplicantEvaluation[];
  categories?: ApplicantCategory[];
}

export interface ApplicantJob {
  job_id: string;
  hiring_lead_rating: string;
  average_rating: string;
  workflow_step_id: string;
  job_title: string;
  applicant_progress: string;
}

export interface ApplicantComment {}
export interface ApplicantRating {}
export interface ApplicantActivity {
  id: string;
  activity: string;
  date: string;
  time: string;
}
export interface ApplicantMessage {
  comm_id: string;
  comm_subject: string;
  comm_text: string;
  comm_author_email: string;
  comm_to: string;
  comm_cc: string;
  comm_bcc: string;
  comm_datetime_sent: string; // yyyy-mm-dd hh:mm:ss
}
export interface ApplicantQuestion {
  question: string;
  answer: string;
}
export interface ApplicantEvaluation {
  id: string;
  name: string;
  category: string;
  rating: string;
  comment: string;
}
export interface ApplicantCategory {}

export interface Job {
  // /jobs
  id: string;
  team_id: string;
  title: string;
  country_id: string;
  city: string;
  state: string;
  zip: string;
  department: string;
  description: string;
  minimum_salary: string;
  maximum_salary: string;
  notes: string;
  original_open_date: string; // yyyy-mm-dd
  type: string;
  status: string;
  send_to_job_boards: string;
  hiring_lead: string;
  board_code: string;
  internal_code: string;
  questionnaire: string;
  // end of /jobs

  // /jobs/job_id
  // also includes properties:
  // id
  // team_id
  // title
  // country_id
  // city
  // state
  // zip
  // department
  // description
  // minimum_salary
  // maximum_salary
  // notes
  // original_open_date
  // type
  // status
  // send_to_job_boards
  // hiring_lead
  // board_code
  // internal_code
  // questionnaire
  job_applicants?: JobApplicant[];
}

export interface JobApplicant {
  prospect_id: string;
  apply_date: string;
}
