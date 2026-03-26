// src/components/SqlQueryOptimizer.js
import React, { useState } from "react";
// Import the formatter function
import { format } from "sql-formatter";
import { motion } from "framer-motion";
import {
  FadeInOnScroll,
  StaggerContainer,
  StaggerItem,
} from "@site/src/components/animations";
import styles from "./SqlQueryOptimizer.module.css";

const DATABASE_TYPES = [
  { label: "PostgreSQL", value: "postgresql" },
  { label: "MySQL", value: "mysql" },
  { label: "MSSQL (SQL Server)", value: "mssql" },
  { label: "Trino (PrestoSQL)", value: "trino" },
  { label: "Snowflake", value: "snowflake" },
  { label: "Google BigQuery", value: "bigquery" },
];

const SQL_KEYWORD_REGEX =
  /^\s*(SELECT|INSERT|UPDATE|DELETE|WITH|CREATE|ALTER|DROP|TRUNCATE|MERGE)\b/i;

function SqlQueryOptimizer() {
  const [query, setQuery] = useState("");
  const [dbType, setDbType] = useState(DATABASE_TYPES[0].value);
  const [optimizationResults, setOptimizationResults] = useState([]);

  // --- UPDATED FORMATTING FUNCTION ---
  const formatQuery = () => {
    const trimmedQuery = query.trim();

    // 1. Check if the input is empty
    if (!trimmedQuery) {
      setOptimizationResults([
        {
          type: "error",
          text: "Please enter a query before attempting to format.",
        },
      ]);
      return;
    }

    // 2. Check if the input starts with a recognized SQL keyword
    if (!SQL_KEYWORD_REGEX.test(trimmedQuery)) {
      setOptimizationResults([
        {
          type: "error",
          text: "Cannot format: Input does not appear to be a valid SQL statement (missing keyword like SELECT, INSERT, or UPDATE at the start).",
        },
      ]);
      return;
    }

    // 3. Attempt to format
    try {
      const formattedSql = format(query, {
        language: dbType,
        keywordCase: "upper",
        indent: "  ",
      });
      setQuery(formattedSql);
      setOptimizationResults([
        { type: "success", text: "Query successfully formatted." },
      ]);
    } catch (e) {
      // Catch general formatter errors (e.g., extremely broken syntax)
      setOptimizationResults([
        {
          type: "error",
          text: "The formatter encountered a structural error. Please check your SQL syntax.",
        },
      ]);
    }
  };
  // --- END UPDATED FORMATTING FUNCTION ---

  const analyzeQuery = () => {
    let suggestions = [];
    const trimmedQuery = query.trim();
    const lowerCaseQuery = trimmedQuery.toLowerCase();

    // 1. Basic Validation
    if (!trimmedQuery) {
      setOptimizationResults([
        { type: "error", text: "Please enter a SQL query to analyze." },
      ]);
      return;
    }

    if (!SQL_KEYWORD_REGEX.test(trimmedQuery)) {
      setOptimizationResults([
        {
          type: "error",
          text: "The input does not appear to be a valid SQL statement (missing keyword like SELECT, INSERT, or UPDATE at the start).",
        },
      ]);
      return;
    }
    // 2. Optimization logic (content remains the same)

    // General best practices (apply to most DBs)
    if (lowerCaseQuery.includes("select *")) {
      suggestions.push({
        type: "warning",
        text: "Avoid `SELECT *`. Explicitly list columns for better performance, reduced network traffic, and clearer intent.",
      });
    }
    if (
      lowerCaseQuery.includes("order by") &&
      !lowerCaseQuery.includes("limit")
    ) {
      suggestions.push({
        type: "info",
        text: "Consider adding a `LIMIT` clause when using `ORDER BY` to restrict the result set size, especially on large tables.",
      });
    }
    if (
      lowerCaseQuery.match(/\s+or\s+/g) &&
      lowerCaseQuery.match(/\s+or\s+/g).length > 1
    ) {
      suggestions.push({
        type: "warning",
        text: "Chaining multiple `OR` conditions can be inefficient. Consider using `IN` clause or refactoring the query if possible.",
      });
    }
    if (lowerCaseQuery.includes("like '%...%'")) {
      suggestions.push({
        type: "warning",
        text: "Using `LIKE '%...%'` (leading wildcard) prevents index usage. Consider full-text search or redesigning if performance is critical.",
      });
    }
    if (
      lowerCaseQuery.includes("having") &&
      !lowerCaseQuery.includes("group by")
    ) {
      suggestions.push({
        type: "error",
        text: "`HAVING` clause must be used with `GROUP BY`. Check your query logic.",
      });
    }
    if (
      lowerCaseQuery.includes("union") &&
      !lowerCaseQuery.includes("union all")
    ) {
      suggestions.push({
        type: "info",
        text: "`UNION` implicitly removes duplicates, which can be costly. If duplicates are acceptable, use `UNION ALL` for better performance.",
      });
    }

    // Database-specific suggestions
    switch (dbType) {
      case "postgresql":
        if (lowerCaseQuery.includes("count(*)")) {
          suggestions.push({
            type: "info",
            text: "For exact row counts in PostgreSQL, `COUNT(*)` scans. For approximate counts, consider `pg_class.reltuples` for speed.",
          });
        }
        if (lowerCaseQuery.includes("array_agg")) {
          suggestions.push({
            type: "info",
            text: "`ARRAY_AGG` can be powerful but be mindful of memory usage on very large groups.",
          });
        }
        if (lowerCaseQuery.includes("::jsonb")) {
          suggestions.push({
            type: "info",
            text: "Using `JSONB` for JSON data is generally more efficient for querying than `JSON` in PostgreSQL.",
          });
        }
        break;
      case "mysql":
        if (lowerCaseQuery.includes("innodb_buffer_pool_size")) {
          suggestions.push({
            type: "info",
            text: "Ensure `innodb_buffer_pool_size` is adequately configured for your workload to cache data and indexes.",
          });
        }
        if (lowerCaseQuery.includes("for update")) {
          suggestions.push({
            type: "info",
            text: "`FOR UPDATE` locks rows. Use judiciously to avoid contention in high-concurrency environments.",
          });
        }
        if (
          lowerCaseQuery.includes("group by") &&
          lowerCaseQuery.includes("order by")
        ) {
          suggestions.push({
            type: "info",
            text: "In MySQL, `GROUP BY` and `ORDER BY` on different columns can require temporary tables and filesorts. Optimize index usage.",
          });
        }
        break;
      case "mssql":
        if (lowerCaseQuery.includes("nolock")) {
          suggestions.push({
            type: "warning",
            text: "Using `NOLOCK` (or `READ UNCOMMITTED`) can lead to dirty reads. Use with caution and understand the implications.",
          });
        }
        if (
          lowerCaseQuery.includes("datepart") ||
          lowerCaseQuery.includes("convert(date")
        ) {
          suggestions.push({
            type: "warning",
            text: "Applying functions (`DATEPART`, `CONVERT`) to indexed columns in `WHERE` clauses can prevent index usage. Consider comparing against date ranges instead.",
          });
        }
        if (lowerCaseQuery.includes("exists")) {
          suggestions.push({
            type: "info",
            text: "In MSSQL, `EXISTS` is often more efficient than `IN` for subqueries, especially when the subquery returns many rows.",
          });
        }
        break;
      case "trino":
        if (lowerCaseQuery.includes("partition by")) {
          suggestions.push({
            type: "info",
            text: "Trino benefits greatly from well-defined partitions. Ensure your tables are partitioned optimally for your queries.",
          });
        }
        if (lowerCaseQuery.includes("join")) {
          suggestions.push({
            type: "info",
            text: "Trino prefers smaller tables on the right side of a join for broadcast joins. Reorder large joins if possible.",
          });
        }
        if (lowerCaseQuery.includes("approx_distinct")) {
          suggestions.push({
            type: "info",
            text: "For approximate distinct counts, `APPROX_DISTINCT` is much faster than `COUNT(DISTINCT ...)` in Trino.",
          });
        }
        break;
      case "snowflake":
        if (lowerCaseQuery.includes("cluster by")) {
          suggestions.push({
            type: "info",
            text: "Clustering keys in Snowflake can significantly improve query performance for large tables, especially with range filters.",
          });
        }
        if (
          lowerCaseQuery.includes("variant") ||
          lowerCaseQuery.includes("object")
        ) {
          suggestions.push({
            type: "info",
            text: "Querying `VARIANT` data in Snowflake is powerful. Flattening JSON can sometimes yield better performance for heavily filtered fields.",
          });
        }
        if (lowerCaseQuery.includes("auto_suspend")) {
          suggestions.push({
            type: "info",
            text: "Ensure your Snowflake warehouses have appropriate `AUTO_SUSPEND` settings to manage costs effectively.",
          });
        }
        break;
      case "bigquery":
        if (lowerCaseQuery.includes("partition by")) {
          suggestions.push({
            type: "info",
            text: "Ensure tables are partitioned and clustered correctly in BigQuery to minimize data scanned and reduce costs/improve performance.",
          });
        }
        if (lowerCaseQuery.includes("qualify")) {
          suggestions.push({
            type: "info",
            text: "BigQuery's `QUALIFY` clause is very efficient for filtering results from window functions. Use it to your advantage.",
          });
        }
        if (lowerCaseQuery.includes("select *")) {
          suggestions.push({
            type: "warning",
            text: "BigQuery charges by data scanned. `SELECT *` should be avoided at all costs unless absolutely necessary. Be explicit!",
          });
        }
        break;
      default:
        // No specific suggestions for unknown DB types
        break;
    }

    if (suggestions.length === 0) {
      suggestions.push({
        type: "success",
        text: "No immediate optimization tips found based on current analysis. Keep up the good work!",
      });
    }

    setOptimizationResults(suggestions);
  };

  const resultIcons = {
    info: "ℹ️",
    warning: "⚠️",
    error: "✕",
    success: "✓",
  };

  return (
    <div className={styles.optimizerContainer}>
      {/* ── Hero ── */}
      <FadeInOnScroll direction="down">
        <div className={styles.hero}>
          <h1 className={styles.heroTitle}>SQL Query Optimiser</h1>
          <p className={styles.heroSubtitle}>
            Input your SQL query, select a database type, and get instant
            optimization and formatting tools.
          </p>
        </div>
      </FadeInOnScroll>

      {/* ── Database type pill selector ── */}
      <div className={styles.inputGroup}>
        <span className={styles.label}>Select Database Type:</span>
        <StaggerContainer className={styles.pillGroup} staggerDelay={0.06}>
          {DATABASE_TYPES.map((db) => (
            <StaggerItem key={db.value}>
              <motion.button
                className={`${styles.pill} ${
                  dbType === db.value ? styles.pillActive : ""
                }`}
                onClick={() => {
                  setDbType(db.value);
                  setOptimizationResults([]);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                type="button"
              >
                {db.label}
              </motion.button>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* ── SQL textarea ── */}
      <div className={styles.inputGroup}>
        <div className={styles.textareaWrapper}>
          <span className={styles.textareaLabel}>SQL Input</span>
          <textarea
            id="sqlQuery"
            className={styles.textarea}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., SELECT * FROM users WHERE age > 30 ORDER BY registration_date DESC;"
            rows="10"
          />
        </div>
      </div>

      {/* ── Action buttons ── */}
      <div className={styles.buttonContainer}>
        <motion.button
          className={styles.buttonPrimary}
          onClick={analyzeQuery}
          whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(221,117,150,0.45)" }}
          whileTap={{ scale: 0.97 }}
          type="button"
        >
          Analyse Query
        </motion.button>
        <motion.button
          className={styles.buttonGhost}
          onClick={formatQuery}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          type="button"
        >
          Format Query
        </motion.button>
      </div>

      {/* ── Results panel ── */}
      {optimizationResults.length > 0 && (
        <div className={styles.resultsContainer}>
          <h3 className={styles.resultsHeading}>Optimisation Suggestions:</h3>
          <StaggerContainer className={styles.resultsList} staggerDelay={0.08}>
            {optimizationResults.map((result, index) => (
              <StaggerItem key={index}>
                <div
                  className={`${styles.resultItem} ${styles[result.type]}`}
                >
                  <span className={styles.resultIcon}>
                    {resultIcons[result.type]}
                  </span>
                  <span>{result.text}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      )}
    </div>
  );
}

export default SqlQueryOptimizer;
