
CREATE TABLE support_tasks (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    
    title VARCHAR(255) NOT NULL,
   
    status VARCHAR(50) NOT NULL DEFAULT 'OPEN'
     CHECK (status IN ('OPEN','IN_PROGRESS','RESOLVED')),
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
   
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);