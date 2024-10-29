-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

SELECT
  id,
  station,
  NAME,
  ROUND((0.55 * jan + 0.06 * (100 - jan)) / 100 * 5, 2) AS jan_alb_rad,
  ROUND((0.55 * feb + 0.06 * (100 - feb)) / 100 * 24, 2) AS feb_alb_rad,
  ROUND((0.55 * mar + 0.06 * (100 - mar)) / 100 * 68, 2) AS mar_alb_rad,
  ROUND((0.55 * apr + 0.06 * (100 - apr)) / 100 * 125, 2) AS apr_alb_rad,
  ROUND((0.55 * may + 0.06 * (100 - may)) / 100 * 182, 2) AS may_alb_rad,
  ROUND((0.55 * jun + 0.06 * (100 - jun)) / 100 * 197, 2) AS jun_alb_rad,
  ROUND((0.55 * jul + 0.06 * (100 - jul)) / 100 * 182, 2) AS jul_alb_rad,
  ROUND((0.55 * aug + 0.06 * (100 - aug)) / 100 * 141, 2) AS aug_alb_rad,
  ROUND((0.55 * sep + 0.06 * (100 - sep)) / 100 * 79, 2) AS sep_alb_rad,
  ROUND((0.55 * oct + 0.06 * (100 - oct)) / 100 * 36, 2) AS oct_alb_rad,
  ROUND((0.55 * nov + 0.06 * (100 - nov)) / 100 * 9, 2) AS nov_alb_rad,
  ROUND((0.55 * DEC + 0.06 * (100 - DEC)) / 100 * 2, 2) AS dec_alb_rad,
  ROUND(
    (
      ROUND((0.55 * jan + 0.06 * (100 - jan)) / 100 * 5, 2) + ROUND((0.55 * feb + 0.06 * (100 - feb)) / 100 * 24, 2) + ROUND((0.55 * mar + 0.06 * (100 - mar)) / 100 * 68, 2) + ROUND((0.55 * apr + 0.06 * (100 - apr)) / 100 * 125, 2) + ROUND((0.55 * may + 0.06 * (100 - may)) / 100 * 182, 2) + ROUND((0.55 * jun + 0.06 * (100 - jun)) / 100 * 197, 2) + ROUND((0.55 * jul + 0.06 * (100 - jul)) / 100 * 182, 2) + ROUND((0.55 * aug + 0.06 * (100 - aug)) / 100 * 141, 2) + ROUND((0.55 * sep + 0.06 * (100 - sep)) / 100 * 79, 2) + ROUND((0.55 * oct + 0.06 * (100 - oct)) / 100 * 36, 2) + ROUND((0.55 * nov + 0.06 * (100 - nov)) / 100 * 9, 2) + ROUND((0.55 * DEC + 0.06 * (100 - DEC)) / 100 * 2, 2)
    ) / 12,
    2
  ) * 21.9 AS tdee
FROM
  public.stations2;

-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

SELECT
  id,
  station,
  NAME,
  CAST(
    (
      (0.55 * jan + 0.06 * (100 - jan)) / 100 * 5 + (0.55 * feb + 0.06 * (100 - feb)) / 100 * 24 + (0.55 * mar + 0.06 * (100 - mar)) / 100 * 68 + (0.55 * apr + 0.06 * (100 - apr)) / 100 * 125 + (0.55 * may + 0.06 * (100 - may)) / 100 * 182 + (0.55 * jun + 0.06 * (100 - jun)) / 100 * 197 + (0.55 * jul + 0.06 * (100 - jul)) / 100 * 182 + (0.55 * aug + 0.06 * (100 - aug)) / 100 * 141 + (0.55 * sep + 0.06 * (100 - sep)) / 100 * 79 + (0.55 * oct + 0.06 * (100 - oct)) / 100 * 36 + (0.55 * nov + 0.06 * (100 - nov)) / 100 * 9 + (0.55 * DEC + 0.06 * (100 - DEC)) / 100 * 2
    ) / 12 * 21.9 AS INTEGER
  ) AS tdee
FROM
  public.stations2;