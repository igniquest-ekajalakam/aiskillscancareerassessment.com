/* ============================================================
   Shared Footer Component
   Edit this file to update the footer across ALL pages.
   ============================================================ */
(function () {
    const footerHTML = `
    <footer class="footer">
        <div class="container">
            <div class="footer__grid">
                <div class="footer__brand">
                    <img src="assets/AiSkilScan.jpg" alt="AI Skill Scan Logo" style="height:40px; filter: brightness(0) invert(1);">
                    <p>AI SKILL SCAN Career Assessment is an advanced AI-based psychometric test that helps individuals make informed career decisions through comprehensive assessment.</p>
                </div>
                <div>
                    <h4 class="footer__title">Quick Links</h4>
                    <ul class="footer__links">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about.html">About the Test</a></li>
                        <li><a href="assessments.html">Assessments</a></li>
                        <li><a href="how-it-works.html">How It Works</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="footer__title">Resources</h4>
                    <ul class="footer__links">
                        <li><a href="sample-report.html">Sample Report</a></li>
                        <li><a href="schools.html">For Schools</a></li>
                        <li><a href="faq.html">FAQ</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="footer__title">Assessments</h4>
                    <ul class="footer__links">
                        <li><a href="assessments.html#high-school">High School</a></li>
                        <li><a href="assessments.html#higher-secondary">Higher Secondary</a></li>
                        <li><a href="assessments.html#graduates">Graduates</a></li>
                        <li><a href="assessments.html#employee">Employee Diagnostic</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer__bottom">
                <p>&copy; 2026 AI SKILL SCAN Career Assessment. All rights reserved. | aiskillscancareerassessment.com</p>
                <p style="margin-top:8px; font-size:0.8rem;">Developed by : <span style="color:#00bfff; font-weight:600;">Igniquest Technologies</span></p>
            </div>
        </div>
    </footer>`;

    const placeholder = document.getElementById('footer-placeholder');
    if (placeholder) {
        placeholder.outerHTML = footerHTML;
    }
})();
