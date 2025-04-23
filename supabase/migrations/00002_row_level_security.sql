-- Enable Row Level Security on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE loops ENABLE ROW LEVEL SECURITY;
ALTER TABLE loop_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE rule_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view their own data" 
  ON users FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" 
  ON users FOR UPDATE 
  USING (auth.uid() = id);

-- Create policies for categories table
CREATE POLICY "Users can view their own categories" 
  ON categories FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own categories" 
  ON categories FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own categories" 
  ON categories FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own categories" 
  ON categories FOR DELETE 
  USING (auth.uid() = user_id);

-- Create policies for loops table
CREATE POLICY "Users can view their own loops" 
  ON loops FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own loops" 
  ON loops FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own loops" 
  ON loops FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own loops" 
  ON loops FOR DELETE 
  USING (auth.uid() = user_id);

-- Create policies for loop_emails table
CREATE POLICY "Users can view their own loop emails" 
  ON loop_emails FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM loops 
    WHERE loops.id = loop_emails.loop_id 
    AND loops.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert their own loop emails" 
  ON loop_emails FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM loops 
    WHERE loops.id = loop_emails.loop_id 
    AND loops.user_id = auth.uid()
  ));

CREATE POLICY "Users can update their own loop emails" 
  ON loop_emails FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM loops 
    WHERE loops.id = loop_emails.loop_id 
    AND loops.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete their own loop emails" 
  ON loop_emails FOR DELETE 
  USING (EXISTS (
    SELECT 1 FROM loops 
    WHERE loops.id = loop_emails.loop_id 
    AND loops.user_id = auth.uid()
  ));

-- Create policies for templates table
CREATE POLICY "Users can view their own templates" 
  ON templates FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own templates" 
  ON templates FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own templates" 
  ON templates FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own templates" 
  ON templates FOR DELETE 
  USING (auth.uid() = user_id);

-- Create policies for rules table
CREATE POLICY "Users can view their own rules" 
  ON rules FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own rules" 
  ON rules FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own rules" 
  ON rules FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own rules" 
  ON rules FOR DELETE 
  USING (auth.uid() = user_id);

-- Create policies for rule_categories table
CREATE POLICY "Users can view their own rule categories" 
  ON rule_categories FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM rules 
    WHERE rules.id = rule_categories.rule_id 
    AND rules.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert their own rule categories" 
  ON rule_categories FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM rules 
    WHERE rules.id = rule_categories.rule_id 
    AND rules.user_id = auth.uid()
  ));

CREATE POLICY "Users can update their own rule categories" 
  ON rule_categories FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM rules 
    WHERE rules.id = rule_categories.rule_id 
    AND rules.user_id = auth.uid()
  ));

CREATE POLICY "Users can delete their own rule categories" 
  ON rule_categories FOR DELETE 
  USING (EXISTS (
    SELECT 1 FROM rules 
    WHERE rules.id = rule_categories.rule_id 
    AND rules.user_id = auth.uid()
  ));

-- Create policies for notifications table
CREATE POLICY "Users can view their own notifications" 
  ON notifications FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own notifications" 
  ON notifications FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" 
  ON notifications FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notifications" 
  ON notifications FOR DELETE 
  USING (auth.uid() = user_id);
