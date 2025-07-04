/*
  # Increment comments count function

  1. Function
    - Creates a function to safely increment comments count
    - Handles concurrent updates properly
*/

CREATE OR REPLACE FUNCTION increment_comments_count(post_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE posts 
  SET comments_count = comments_count + 1 
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;