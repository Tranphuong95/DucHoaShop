package org.regitiny.duchoashop.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.regitiny.duchoashop.web.rest.TestUtil;

public class ProductdetailTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Productdetail.class);
        Productdetail productdetail1 = new Productdetail();
        productdetail1.setId(1L);
        Productdetail productdetail2 = new Productdetail();
        productdetail2.setId(productdetail1.getId());
        assertThat(productdetail1).isEqualTo(productdetail2);
        productdetail2.setId(2L);
        assertThat(productdetail1).isNotEqualTo(productdetail2);
        productdetail1.setId(null);
        assertThat(productdetail1).isNotEqualTo(productdetail2);
    }
}
