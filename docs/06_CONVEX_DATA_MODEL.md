# Convex Data Model

## Core Tables

### users

- externalAuthId
- name
- email
- role
- schoolId
- createdAt

### schools

- name
- board
- subscriptionStatus
- createdAt

### classes

- schoolId
- teacherId
- name
- grade
- section
- subjectId
- academicYear

### students

- classId
- name
- rollNumber
- status

### curriculumNodes

- board
- grade
- subject
- book
- nodeType
- parentId
- code
- title
- description
- order

### assessments

- classId
- title
- chapterIds
- status
- totalMarks
- createdBy
- createdAt

### questions

- assessmentId
- order
- text
- responseType
- maxMarks
- modelAnswer
- rubric
- curriculumNodeIds

### submissions

- assessmentId
- studentId
- status
- submittedAt

### answers

- submissionId
- questionId
- rawResponse
- normalizedResponse
- parseWarnings

### evaluations

- answerId
- workflowRunId
- awardedMarks
- maxMarks
- rubricResults
- feedback
- misconception
- confidence
- reviewRequired
- status
- approvedBy
- approvedAt

### insightSnapshots

- classId
- assessmentIds
- type
- metrics
- narrativeInsights
- createdAt

### weeklyPlans

- classId
- weekStart
- sourceInsightId
- constraints
- days
- resources
- status
- approvedBy

### resources

- source
- externalUrl
- title
- summary
- curriculumTags
- retrievedAt

### workflowRuns

- workflowType
- entityType
- entityId
- status
- currentStage
- agentTrace
- error
- startedAt
- completedAt

### auditEvents

- actorId
- action
- entityType
- entityId
- metadata
- createdAt

## Data Rules

- Approved evaluations are immutable; corrections create revisions.
- Workflow traces must not store secrets.
- Student data access is scoped by class and school.
- Curriculum nodes are seeded and versioned.
- Planner resources are optional and replaceable.
