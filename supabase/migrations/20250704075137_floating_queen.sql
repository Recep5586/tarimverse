/*
  # Increment shares count function

  1. Function
    - Creates a function to safely increment shares count
    - Handles concurrent updates properly
*/

CREATE OR REPLACE FUNCTION increment_shares_count(post_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE posts 
  SET shares_count = shares_count + 1 
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;