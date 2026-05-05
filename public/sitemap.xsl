<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
  version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sm="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="sm xhtml">

  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head>
        <title>XML Sitemap — Blogtec</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 14px;
            line-height: 1.5;
            color: #1a1a1a;
            background: #f5f5f5;
          }
          header {
            background: #111;
            padding: 18px 32px;
            display: flex;
            align-items: center;
            gap: 16px;
          }
          header h1 {
            color: #fff;
            font-size: 18px;
            font-weight: 600;
            letter-spacing: -0.01em;
          }
          header .badge {
            background: #333;
            color: #aaa;
            font-size: 11px;
            padding: 2px 8px;
            border-radius: 4px;
            letter-spacing: 0.04em;
          }
          main {
            max-width: 1060px;
            margin: 32px auto;
            padding: 0 24px;
          }
          .intro {
            background: #fff;
            border: 1px solid #e8e8e8;
            border-radius: 10px;
            padding: 18px 22px;
            margin-bottom: 20px;
            font-size: 13px;
            color: #555;
          }
          .intro p + p { margin-top: 4px; }
          .intro a { color: #2563eb; text-decoration: none; }
          .intro a:hover { text-decoration: underline; }
          .count {
            font-size: 13px;
            font-weight: 600;
            color: #444;
            margin-bottom: 12px;
          }
          .count span { color: #111; }
          table {
            width: 100%;
            border-collapse: collapse;
            background: #fff;
            border: 1px solid #e8e8e8;
            border-radius: 10px;
            overflow: hidden;
          }
          thead th {
            background: #f7f7f7;
            padding: 11px 16px;
            text-align: left;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: #888;
            border-bottom: 1px solid #e8e8e8;
          }
          tbody td {
            padding: 10px 16px;
            border-bottom: 1px solid #f0f0f0;
            vertical-align: middle;
            font-size: 13px;
          }
          tbody tr:last-child td { border-bottom: none; }
          tbody tr:hover td { background: #f0f6ff; }
          .url-cell a {
            color: #2563eb;
            text-decoration: none;
            word-break: break-all;
          }
          .url-cell a:hover { text-decoration: underline; }
          .meta {
            white-space: nowrap;
            color: #888;
            width: 155px;
          }
          .pri {
            width: 80px;
            text-align: center;
            color: #888;
          }
        </style>
      </head>
      <body>
        <header>
          <h1>XML Sitemap</h1>
          <span class="badge">blogtec.io</span>
        </header>
        <main>
          <div class="intro">
            <p>This sitemap is generated for <a href="https://blogtec.io">blogtec.io</a> and is meant for search engine crawlers, not humans.</p>
            <p>Learn more at <a href="https://www.sitemaps.org/" target="_blank" rel="noopener">sitemaps.org</a>.</p>
          </div>
          <xsl:apply-templates/>
        </main>
      </body>
    </html>
  </xsl:template>

  <!-- Sitemap Index -->
  <xsl:template match="sm:sitemapindex">
    <p class="count">This index file contains <span><xsl:value-of select="count(sm:sitemap)"/> sitemaps</span>.</p>
    <table>
      <thead>
        <tr>
          <th>Sitemap</th>
          <th>Last Modified</th>
        </tr>
      </thead>
      <tbody>
        <xsl:for-each select="sm:sitemap">
          <tr>
            <td class="url-cell"><a href="{sm:loc}"><xsl:value-of select="sm:loc"/></a></td>
            <td class="meta"><xsl:value-of select="sm:lastmod"/></td>
          </tr>
        </xsl:for-each>
      </tbody>
    </table>
  </xsl:template>

  <!-- URL Set -->
  <xsl:template match="sm:urlset">
    <p class="count">This sitemap contains <span><xsl:value-of select="count(sm:url)"/> URLs</span>.</p>
    <table>
      <thead>
        <tr>
          <th>URL</th>
          <th>Last Modified</th>
          <th>Priority</th>
        </tr>
      </thead>
      <tbody>
        <xsl:for-each select="sm:url">
          <tr>
            <td class="url-cell"><a href="{sm:loc}"><xsl:value-of select="sm:loc"/></a></td>
            <td class="meta"><xsl:value-of select="sm:lastmod"/></td>
            <td class="pri"><xsl:value-of select="sm:priority"/></td>
          </tr>
        </xsl:for-each>
      </tbody>
    </table>
  </xsl:template>

</xsl:stylesheet>
